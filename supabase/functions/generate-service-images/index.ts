import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.7.1";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const servicePrompts: Record<string, { back: string; front: string }> = {
  "Tráfego Pago": {
    back: "Dark tech aesthetic, black navy blue gradient background, neon blue cyan glowing dashboard with analytics charts and graphs, minimalist 3D illustration of ad campaign metrics, professional marketing agency visual, high contrast, no text, clean modern design, floating data visualization elements with blue glow",
    front: "Dark tech aesthetic, black background, neon blue cyan glowing rocket launching upward with money symbols and target icons, minimalist 3D style, professional paid traffic concept, high contrast, no text, clean modern design with subtle blue particle effects"
  },
  "Produção de Conteúdo": {
    back: "Dark tech aesthetic, black navy blue gradient background, neon blue cyan glowing camera and video equipment, minimalist 3D illustration of content creation tools, professional studio visual, high contrast, no text, clean modern design, floating media elements with blue glow",
    front: "Dark tech aesthetic, black background, neon blue cyan glowing play button with creative sparkles, minimalist 3D style, professional content production concept, high contrast, no text, clean modern design with video frame elements"
  },
  "Criação de Sites": {
    back: "Dark tech aesthetic, black navy blue gradient background, neon blue cyan glowing website wireframe mockup, minimalist 3D illustration of browser window with code elements, professional web development visual, high contrast, no text, clean modern design, floating UI components with blue glow",
    front: "Dark tech aesthetic, black background, neon blue cyan glowing laptop with modern website displayed, minimalist 3D style, professional web design concept, high contrast, no text, clean modern design with responsive device mockups"
  },
  "Automação Inteligente": {
    back: "Dark tech aesthetic, black navy blue gradient background, neon blue cyan glowing robot with gears and circuits, minimalist 3D illustration of AI automation, professional tech visual, high contrast, no text, clean modern design, floating mechanical elements with blue glow",
    front: "Dark tech aesthetic, black background, neon blue cyan glowing brain with neural network connections, minimalist 3D style, professional artificial intelligence concept, high contrast, no text, clean modern design with data flow elements"
  },
  "Consultoria Estratégica": {
    back: "Dark tech aesthetic, black navy blue gradient background, neon blue cyan glowing chess pieces and strategy board, minimalist 3D illustration of business planning, professional consulting visual, high contrast, no text, clean modern design, floating analytical elements with blue glow",
    front: "Dark tech aesthetic, black background, neon blue cyan glowing lightbulb with growth chart arrows, minimalist 3D style, professional strategy concept, high contrast, no text, clean modern design with target and milestone elements"
  },
  "Lojas Online": {
    back: "Dark tech aesthetic, black navy blue gradient background, neon blue cyan glowing shopping cart with e-commerce interface, minimalist 3D illustration of online store dashboard, professional visual, high contrast, no text, clean modern design, floating product cards with blue glow",
    front: "Dark tech aesthetic, black background, neon blue cyan glowing storefront with digital products, minimalist 3D style, professional e-commerce concept, high contrast, no text, clean modern design with payment and shipping icons"
  },
  "Gestão de Redes Sociais": {
    back: "Dark tech aesthetic, black navy blue gradient background, neon blue cyan glowing social media icons floating, minimalist 3D illustration of engagement metrics dashboard, professional social media visual, high contrast, no text, clean modern design, notification and like elements with blue glow",
    front: "Dark tech aesthetic, black background, neon blue cyan glowing smartphone with social feed, minimalist 3D style, professional social management concept, high contrast, no text, clean modern design with hashtag and connection elements"
  },
  "Criação de Sistemas": {
    back: "Dark tech aesthetic, black navy blue gradient background, neon blue cyan glowing code editor with system architecture, minimalist 3D illustration of software development, professional tech visual, high contrast, no text, clean modern design, floating database and API elements with blue glow",
    front: "Dark tech aesthetic, black background, neon blue cyan glowing server rack with data streams, minimalist 3D style, professional system development concept, high contrast, no text, clean modern design with cloud computing elements"
  },
  "Identidade Visual": {
    back: "Dark tech aesthetic, black navy blue gradient background, neon blue cyan glowing brand elements and color palette, minimalist 3D illustration of design tools, professional branding visual, high contrast, no text, clean modern design, floating typography and logo elements with blue glow",
    front: "Dark tech aesthetic, black background, neon blue cyan glowing creative eye with design compass, minimalist 3D style, professional visual identity concept, high contrast, no text, clean modern design with gradient and shape elements"
  }
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { serviceTitle, imageType } = await req.json();
    
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const prompts = servicePrompts[serviceTitle];
    if (!prompts) {
      throw new Error(`No prompts found for service: ${serviceTitle}`);
    }

    const prompt = imageType === "back" ? prompts.back : prompts.front;

    console.log(`Generating ${imageType} image for: ${serviceTitle}`);
    console.log(`Prompt: ${prompt}`);

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash-image-preview",
        messages: [
          {
            role: "user",
            content: prompt
          }
        ],
        modalities: ["image", "text"]
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      throw new Error(`AI gateway error: ${response.status}`);
    }

    const data = await response.json();
    console.log("AI response received");

    const imageData = data.choices?.[0]?.message?.images?.[0]?.image_url?.url;
    if (!imageData) {
      throw new Error("No image data in response");
    }

    // Extract base64 data
    const base64Data = imageData.replace(/^data:image\/\w+;base64,/, "");
    const imageBuffer = Uint8Array.from(atob(base64Data), c => c.charCodeAt(0));

    // Generate unique filename
    const sanitizedTitle = serviceTitle.toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/\s+/g, "-");
    const filename = `${sanitizedTitle}-${imageType}-${Date.now()}.png`;

    console.log(`Uploading to storage: ${filename}`);

    // Upload to storage
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from("service-images")
      .upload(filename, imageBuffer, {
        contentType: "image/png",
        upsert: true
      });

    if (uploadError) {
      console.error("Upload error:", uploadError);
      throw new Error(`Upload failed: ${uploadError.message}`);
    }

    // Get public URL
    const { data: publicUrlData } = supabase.storage
      .from("service-images")
      .getPublicUrl(filename);

    console.log(`Image uploaded successfully: ${publicUrlData.publicUrl}`);

    return new Response(
      JSON.stringify({ 
        success: true, 
        url: publicUrlData.publicUrl,
        filename 
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );

  } catch (error) {
    console.error("Error:", error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    return new Response(
      JSON.stringify({ error: errorMessage }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
