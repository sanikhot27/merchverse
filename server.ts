import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';
import { createServer as createViteServer } from 'vite';

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// API health endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', brand: 'MERCHVERSE', timestamp: new Date().toISOString() });
});

// Lazy initialize Gemini client to avoid crashes if GEMINI_API_KEY is not configured
let aiClient: GoogleGenAI | null = null;
function getAIClient(): GoogleGenAI | null {
  if (!aiClient && process.env.GEMINI_API_KEY) {
    try {
      aiClient = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
    } catch (e) {
      console.warn('Gemini client initialization warning:', e);
    }
  }
  return aiClient;
}

// AI Shopping Assistant Endpoint
app.post('/api/assistant', async (req, res) => {
  const { message, context } = req.body;
  
  if (!message) {
    return res.status(400).json({ error: 'Message is required' });
  }

  const ai = getAIClient();
  const systemPrompt = `You are the MERCHVERSE AI Creator Stylist & Product Advisor for Google's next-generation lifestyle brand.
Brand Tagline: "Designed for Creators. Inspired by Innovation."
Brand Philosophy: Material Design 3 meets Apple polish and Nike storytelling.
Key Products:
1. The Recycled Black Hoodie (Gen-2) - $98. Crafted from 32 ocean plastic bottles with 460 GSM heavyweight circular knit, concealed Pixel Buds pocket in kangaroo pouch, subtle Google quad-color micro-embroidery on left cuff, and encrypted NFC digital twin tag.
2. Nano Banana Tee - $38. Cult-favorite creator staple. 240 GSM Peruvian Pima Cotton with anti-odor silver ion thread and tactile high-density 3D banana embroidery.
3. Gemini Neural Track Jacket - $145. Multimodal techwear with thermochromatic matrix print and hidden tablet sleeve.
4. Quantum Modular Creator Backpack - $185. 24L expandable Cordura with magnetic Fidlock closures and 16" laptop suspension.
5. Cloud Zero Recycled Fleece - $118. 100% circular post-consumer micro-grid with zero microfiber shed.
6. Ergonomic Creator Desk Pad - $65. Vegan cactus leather + felt base with magnetic cable routing.
7. DeepMind Latent Space Cap - $42. Unstructured 6-panel technical twill with Google color bar.
8. Vertex AI Gold Bomber Drop - $220. Strictly limited to 500 numbered pieces (#001/500), reversible gold/matte black.

Respond directly, concisely, and stylishly in 2-4 sentences. Include specific product recommendations from the catalog and explain why they fit the creator's workflow or aesthetic.`;

  if (ai) {
    try {
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: [
          {
            role: 'user',
            parts: [{ text: `${systemPrompt}\n\nUser Question: ${message}` }],
          },
        ],
      });
      const reply = response.text || 'I recommend checking out our Recycled Black Hoodie (Gen-2) and the cult-favorite Nano Banana Tee for the quintessential creator uniform.';
      return res.json({ reply, source: 'gemini' });
    } catch (err: any) {
      console.warn('Gemini API call error, falling back to smart heuristic:', err.message);
    }
  }

  // Smart heuristic responses tailored for creator ecommerce
  const lower = message.toLowerCase();
  let fallbackReply = 'For maximum versatility, I recommend pairing the **Recycled Black Hoodie (Gen-2)** ($98) with our **Ergonomic Creator Desk Pad** ($65). It creates the ultimate deep-work flow state with 460 GSM heavyweight warmth and cable-free minimalism.';

  if (lower.includes('hoodie') || lower.includes('black')) {
    fallbackReply = 'The **Recycled Black Hoodie (Gen-2)** is our flagship creator essential. Crafted with 460 GSM French Terry loopback cotton, 32 rescued ocean bottles, a hidden magnetic Pixel Buds pocket, and an NFC digital twin tag, it is designed for effortless daily wear.';
  } else if (lower.includes('banana') || lower.includes('tee') || lower.includes('t-shirt')) {
    fallbackReply = 'The **Nano Banana Tee** ($38) is our most loved creator staple. Cut from 240 GSM silky Peruvian Pima cotton with anti-odor silver threading, it is the ultimate nod to builder culture.';
  } else if (lower.includes('gift') || lower.includes('present') || lower.includes('under 100') || lower.includes('under $100')) {
    fallbackReply = 'For under $100, the **Nano Banana Tee** ($38) bundled with the **DeepMind Latent Space Cap** ($42) comes out to just $80 and makes the most coveted gift package for any developer, designer, or AI engineer.';
  } else if (lower.includes('size') || lower.includes('fit') || lower.includes('sizing')) {
    fallbackReply = 'Our outerwear has a modern boxy relaxed creator drape. If you prefer a tailored fit for stage presentations, choose your true size; if you want an oversized Tokyo streetwear silhouette for cozy coding sessions, size up one!';
  } else if (lower.includes('sustainable') || lower.includes('eco') || lower.includes('recycle') || lower.includes('green')) {
    fallbackReply = 'Every piece in MERCHVERSE has verifiable impact. The Gen-2 Hoodie diverts 32 plastic bottles and saves 1,450L of water, while our Cloud Zero Fleece is 100% circular post-consumer material with zero microfiber shedding.';
  }

  return res.json({ reply: fallbackReply, source: 'creator_engine' });
});

async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`MERCHVERSE Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
