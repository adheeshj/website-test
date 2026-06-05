import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers":
    "Content-Type, Authorization, X-Client-Info, Apikey",
};

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 200, headers: corsHeaders });
  }

  if (req.method !== "POST") {
    return new Response(
      JSON.stringify({ error: "Method not allowed" }),
      { status: 405, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  }

  try {
    const { customer_name, phone, product_id, product_name, message } =
      await req.json();

    if (!customer_name || !phone || !product_id || !product_name || !message) {
      return new Response(
        JSON.stringify({ error: "Missing required fields" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    // Insert into Supabase
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

    const insertRes = await fetch(`${supabaseUrl}/rest/v1/enquiries`, {
      method: "POST",
      headers: {
        apikey: serviceRoleKey,
        Authorization: `Bearer ${serviceRoleKey}`,
        "Content-Type": "application/json",
        Prefer: "return=minimal",
      },
      body: JSON.stringify({
        customer_name,
        phone,
        product_id,
        product_name,
        message,
      }),
    });

    if (!insertRes.ok) {
      const errBody = await insertRes.text();
      console.error("DB insert failed:", errBody);
      return new Response(
        JSON.stringify({ error: "Failed to save enquiry" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    // Send email via Resend (best-effort — don't fail the enquiry if email fails)
    const resendKey = Deno.env.get("RESEND_API_KEY");
    const storeEmail = Deno.env.get("STORE_EMAIL") || "contact@jyotimusic.com";

    if (resendKey) {
      try {
        await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${resendKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            from: "Jyoti Music Enquiries <onboarding@resend.dev>",
            to: [storeEmail],
            subject: `New Enquiry: ${product_name}`,
            html: `
              <h2>New Product Enquiry</h2>
              <p><strong>Product:</strong> ${product_name}</p>
              <p><strong>Customer:</strong> ${customer_name}</p>
              <p><strong>Phone:</strong> ${phone}</p>
              <p><strong>Message:</strong></p>
              <p>${message}</p>
              <hr />
              <p style="color:#999;font-size:12px;">Submitted via Jyoti Music website</p>
            `,
          }),
        });
      } catch (emailErr) {
        console.error("Email send failed:", emailErr);
      }
    }

    return new Response(
      JSON.stringify({ success: true }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  } catch (err) {
    console.error("Enquiry function error:", err);
    return new Response(
      JSON.stringify({ error: "Internal server error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  }
});
