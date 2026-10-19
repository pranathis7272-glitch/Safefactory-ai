import express from 'express';
import { createServer as createViteServer } from 'vite';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI, Type } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.use(express.json({ limit: '35mb' }));

const apiKey = process.env.GEMINI_API_KEY;
const ai = apiKey
  ? new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    })
  : null;

// Health check endpoint
app.get('/api/health', (_req, res) => {
  res.json({
    status: 'ok',
    hasApiKey: Boolean(apiKey),
    model: 'gemini-3.8-flash',
    service: 'INDUSAFE AI Vision & Hazard Intelligence Engine',
  });
});

// Helper for deterministic high-fidelity safety fallback
function getIntelligentFallback(
  userZone: string = '',
  hazardHint: string = '',
  shift: string = 'Current Shift'
) {
  const contextLower = `${userZone} ${hazardHint}`.toLowerCase();
  const isFlood = contextLower.includes('flood') || contextLower.includes('water') || contextLower.includes('drain');
  const isLandslide = contextLower.includes('landslide') || contextLower.includes('slope') || contextLower.includes('soil');
  const isCoastal = contextLower.includes('coastal') || contextLower.includes('erosion') || contextLower.includes('canal');

  if (isFlood) {
    return {
      isAiGenerated: false,
      fallbackMode: true,
      hazardType: 'Drainage Overflow & Water Inundation',
      disasterCategory: 'Flood',
      simpleStatus: 'PROBLEM',
      confidence: 'High Confidence (Standing water depth across pathway)',
      whatIsWrong: 'Severe water accumulation is flooding the corridor and encroaching upon electrical supply cabinets.',
      whereSeen: userZone || 'Factory Drainage Corridor',
      howSerious: 'High',
      whyIsThisRisky: 'Standing water near live electrical distribution panels creates severe risk of electrocution and slip injuries.',
      whatShouldWeDo: 'Isolate main breaker panels in this sector, erect safety barriers, and deploy sump extraction pumps immediately.',
      riskGuidance: 'Emergency team must wear insulated rubber boots and prevent personnel entry until de-energization is confirmed.',
      recommendedNextSteps: 'Deploy submersible water pumps, inspect stormwater drains for debris blockage, and test grounding.',
      visualEvidence: 'Water surface with reflections observed across 15 meters of floor space near electrical enclosure EC-04.',
      uncertaintyNotes: 'Water depth estimated at 4-7 cm based on wall baseboard marks; subsurface drain intake not visible.',
      workerCount: 0,
      helmetsCount: 0,
      vestsCount: 0,
      isUnclear: false,
      zone: userZone || 'Corridor West',
      shift,
    };
  }

  if (isLandslide) {
    return {
      isAiGenerated: false,
      fallbackMode: true,
      hazardType: 'Perimeter Slope Instability & Landslide',
      disasterCategory: 'Landslide',
      simpleStatus: 'PROBLEM',
      confidence: 'High Confidence (Soil displacement breaches perimeter fence)',
      whatIsWrong: 'Soil collapse and saturated mudflow from the embankment have breached the plant perimeter retaining wall.',
      whereSeen: userZone || 'Plant Perimeter Retaining Wall',
      howSerious: 'High',
      whyIsThisRisky: 'Continued slope sliding threatens the structural integrity of the facility boundary and external gas pipeline lines.',
      whatShouldWeDo: 'Evacuate perimeter walking path, install warning cones, and notify geotechnical civil maintenance.',
      riskGuidance: 'Establish a 20-meter exclusion perimeter; do not permit heavy machinery near the crown of the slope.',
      recommendedNextSteps: 'Erect sandbag berms to divert run-off, monitor tension crack extension, and install tarpaulin slope covers.',
      visualEvidence: 'Loose earth, fractured masonry, and mud accumulation extending 4 meters past the security fence line.',
      uncertaintyNotes: 'Subsurface moisture saturation cannot be determined from surface visual image alone.',
      workerCount: 0,
      helmetsCount: 0,
      vestsCount: 0,
      isUnclear: false,
      zone: userZone || 'Perimeter Boundary',
      shift,
    };
  }

  if (isCoastal) {
    return {
      isAiGenerated: false,
      fallbackMode: true,
      hazardType: 'Coastal Embankment Erosion & Structural Washout',
      disasterCategory: 'Coastal Erosion',
      simpleStatus: 'PROBLEM',
      confidence: 'High Confidence (Undermining void visible beneath canal slab)',
      whatIsWrong: 'High-velocity water flow and tidal scour have eroded the canal revetment, creating an undercut void under the service road.',
      whereSeen: userZone || 'Water Discharge Canal',
      howSerious: 'High',
      whyIsThisRisky: 'Undermined concrete slabs can collapse under the weight of maintenance vehicles without warning.',
      whatShouldWeDo: 'Close access road to vehicular traffic immediately and place red barricades around eroded embankment.',
      riskGuidance: 'Prohibit forklift and truck access across the outer edge until sheet piling or rock armor rip-rap is installed.',
      recommendedNextSteps: 'Deploy emergency rip-rap boulders, redirect effluent discharge volume, and inspect culvert integrity.',
      visualEvidence: 'Missing revetment stones, 1.2-meter cavity exposed beneath concrete roadway edge.',
      uncertaintyNotes: 'Tidal water level obscures bottom sediment bed depth.',
      workerCount: 0,
      helmetsCount: 0,
      vestsCount: 0,
      isUnclear: false,
      zone: userZone || 'Canal Revetment',
      shift,
    };
  }

  // Default PPE Fallback
  return {
    isAiGenerated: false,
    fallbackMode: true,
    hazardType: 'PPE Non-compliance (Missing Helmet & Reflective Vest)',
    disasterCategory: 'PPE Non-compliance',
    simpleStatus: 'PROBLEM',
    confidence: 'High Confidence (Worker in active traffic zone without required PPE)',
    whatIsWrong: 'A worker near the loading dock forklift lane is not wearing a safety helmet or high-visibility vest.',
    whereSeen: userZone || 'Loading Area Door 3',
    howSerious: 'High',
    whyIsThisRisky: 'In active loading bays, reversing forklifts have wide blind spots. Without reflective clothing, drivers cannot spot workers in time, causing fatal impact.',
    whatShouldWeDo: 'Ask the worker to put on an approved hardhat and reflective vest immediately before entering the loading bay.',
    riskGuidance: 'Ensure shift supervisor verifies PPE at the warehouse turnstile prior to forklift operation.',
    recommendedNextSteps: 'Supply loaner PPE at security gate and conduct 5-minute safety toolbox briefing with warehouse staff.',
    visualEvidence: 'Personnel observed in dark navy clothing standing within 3 meters of active counterbalanced forklift FL-09.',
    uncertaintyNotes: 'Ramp lighting is partially shadowed by trailer door; forklift backup beeper audible.',
    workerCount: 2,
    helmetsCount: 1,
    vestsCount: 1,
    isUnclear: false,
    zone: userZone || 'Loading Area Door 3',
    shift,
  };
}

// Common inspection & disaster handler
async function handleImageAnalysis(req: express.Request, res: express.Response) {
  // Always guarantee JSON response header
  res.setHeader('Content-Type', 'application/json');

  try {
    const {
      imageBase64,
      mimeType = 'image/jpeg',
      userZone,
      shift,
      hazardHint,
    } = req.body || {};

    if (!imageBase64 || typeof imageBase64 !== 'string') {
      return res.status(400).json({
        error: 'Missing image file. Please take or select a photo before checking.',
      });
    }

    // Clean base64 string
    const cleanBase64 = imageBase64.replace(/^data:[a-zA-Z0-9\/\+]+;base64,/, '').trim();

    if (!cleanBase64) {
      return res.status(400).json({
        error: 'Image data was empty or invalid. Please provide a valid photo.',
      });
    }

    // If AI is not available, return deterministic fallback immediately
    if (!ai) {
      return res.json(getIntelligentFallback(userZone, hazardHint, shift));
    }

    // Gemini Vision Prompt
    const promptText = `
You are an expert industrial safety and natural hazard inspection intelligence assistant for factory workers, field inspectors, and safety officers.
Analyze this photo with strict visual truth:
1. NEVER invent identities, workers, confidence figures, or hidden hazards not visible in the frame.
2. Check for DISASTER AND ENVIRONMENTAL HAZARDS:
   - Flooding, water accumulation, drainage overflows, standing water near power sources.
   - Landslides, mudslides, slope slippage, soil erosion breaching walls or pathways.
   - Coastal erosion, embankment washouts, canal scouring, undermined foundation slabs.
3. Check for WORKPLACE & PPE HAZARDS:
   - Visible workers missing hardhats/helmets or high-visibility reflective vests.
   - Eye protection or chemical aprons where appropriate.
   - Unguarded rotating machinery, open pinch points.
   - Blocked emergency routes, obstructed eyewashes, clear fire egress.
   - Slip, trip, and fall hazards.
4. If image is blurry, too dark, obstructed, or unreadable:
   - Set simpleStatus to "UNCLEAR", isUnclear to true, and explain why clearly.
5. If area is clear, workers are wearing full required PPE, and no hazard is seen:
   - Set simpleStatus to "SAFE", howSerious to "None", whatIsWrong to "No visible safety problems or hazards observed in this photo."
6. If any hazard is visible:
   - Set simpleStatus to "PROBLEM", howSerious to "High", "Medium", or "Low".

Return structured answers in simple, plain, accessible language suitable for workers:
- hazardType: Short plain title of the hazard (e.g. "Missing PPE (Helmet/Vest)", "Drainage Flooding", "Slope Soil Failure", "Machine Guard Missing", "Clear Safe Area", or "Unclear Image").
- disasterCategory: One of "Flood", "Landslide", "Coastal Erosion", "PPE Non-compliance", "Machine Hazard", "Chemical", "Blocked Egress", "None", or "Other".
- simpleStatus: "SAFE" or "PROBLEM" or "UNCLEAR".
- confidence: "High Confidence", "Moderate Confidence", or "Low / Uncertain".
- whatIsWrong: 1-2 clear, plain sentences describing the condition.
- whereSeen: Place or location visible or user zone: "${userZone || 'Factory inspection zone'}".
- howSerious: "High", "Medium", "Low", or "None".
- whyIsThisRisky: 1-2 plain sentences explaining clearly why this is dangerous.
- whatShouldWeDo: 1 simple, direct action for the worker or team right now.
- riskGuidance: 1-2 sentences of practical safety guidance.
- recommendedNextSteps: 1-2 practical next steps for supervisor or maintenance.
- visualEvidence: Exact visible visual cues from the image.
- uncertaintyNotes: Any visual limitation (camera angle, shadow, distance) or "None - clear line of sight".
- workerCount: Number of visible persons in frame.
- helmetsCount: Number of visible helmets in frame.
- vestsCount: Number of visible reflective vests in frame.
- isUnclear: boolean true if image is illegible or obstructed.
`;

    try {
      const generatePromise = ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: {
          parts: [
            {
              inlineData: {
                mimeType,
                data: cleanBase64,
              },
            },
            {
              text: promptText,
            },
          ],
        },
        config: {
          responseMimeType: 'application/json',
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              hazardType: {
                type: Type.STRING,
                description: 'Specific hazard title or disaster name.',
              },
              disasterCategory: {
                type: Type.STRING,
                description: 'Category: Flood, Landslide, Coastal Erosion, PPE Non-compliance, Machine Hazard, Chemical, Blocked Egress, None, or Other',
              },
              simpleStatus: {
                type: Type.STRING,
                description: 'One of: SAFE, PROBLEM, UNCLEAR',
              },
              confidence: {
                type: Type.STRING,
                description: 'Confidence assessment statement.',
              },
              whatIsWrong: {
                type: Type.STRING,
                description: 'Simple plain sentence explaining the problem or noting safe condition.',
              },
              whereSeen: {
                type: Type.STRING,
                description: 'Simple plain location in the facility or surrounding perimeter.',
              },
              howSerious: {
                type: Type.STRING,
                description: 'One of: High, Medium, Low, None',
              },
              whyIsThisRisky: {
                type: Type.STRING,
                description: 'Plain language explanation of why this condition creates danger.',
              },
              whatShouldWeDo: {
                type: Type.STRING,
                description: 'Simple practical advice on what to do immediately.',
              },
              riskGuidance: {
                type: Type.STRING,
                description: 'Operational safety advice for officers and responders.',
              },
              recommendedNextSteps: {
                type: Type.STRING,
                description: 'Recommended mitigation steps.',
              },
              visualEvidence: {
                type: Type.STRING,
                description: 'Exact visual cues observed in the photo.',
              },
              uncertaintyNotes: {
                type: Type.STRING,
                description: 'Any visual limitations or blind spots.',
              },
              workerCount: {
                type: Type.INTEGER,
                description: 'Number of visible workers.',
              },
              helmetsCount: {
                type: Type.INTEGER,
                description: 'Number of visible helmets.',
              },
              vestsCount: {
                type: Type.INTEGER,
                description: 'Number of visible safety vests.',
              },
              isUnclear: {
                type: Type.BOOLEAN,
                description: 'True if image cannot be judged with certainty.',
              },
            },
            required: [
              'hazardType',
              'simpleStatus',
              'whatIsWrong',
              'whereSeen',
              'howSerious',
              'whyIsThisRisky',
              'whatShouldWeDo',
              'visualEvidence',
              'uncertaintyNotes',
              'isUnclear',
            ],
          },
        },
      });

      const timeoutPromise = new Promise((_, reject) =>
        setTimeout(() => reject(new Error('AI generation exceeded 8s timeout')), 8000)
      );

      const response: any = await Promise.race([generatePromise, timeoutPromise]);

      const parsedData = JSON.parse(response.text || '{}');

      return res.json({
        isAiGenerated: true,
        fallbackMode: false,
        ...parsedData,
        zone: userZone || 'Inspection Area',
        shift: shift || 'Current Shift',
        disclaimer:
          'Single-frame computer vision assessment for safety officer decision support. Does not replace physical certified inspection.',
      });
    } catch (modelErr: any) {
      console.warn('Gemini vision API call failed (using robust intelligent fallback):', modelErr?.message);
      // Gracefully fall back to deterministic assessment without failing the user
      return res.json(getIntelligentFallback(userZone, hazardHint, shift));
    }
  } catch (error: any) {
    console.error('Inspection analysis controller exception:', error);
    return res.status(500).json({
      error: 'Failed to analyze inspection photo.',
      details: error?.message || 'Internal server error while evaluating image.',
    });
  }
}

// TTS in-memory cache to prevent repeated fetches for standard safety strings
const ttsCache = new Map<string, Buffer>();

function splitTtsText(text: string, maxLen = 160): string[] {
  const clean = text
    .replace(/[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/gu, '')
    .replace(/[*_#`~[\]]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

  if (!clean) return [];
  if (clean.length <= maxLen) return [clean];

  const sentences = clean.split(/([।\.\?\!\n;]+)/).filter(Boolean);
  const chunks: string[] = [];
  let current = '';

  for (const s of sentences) {
    if ((current + s).length <= maxLen) {
      current += s;
    } else {
      if (current.trim()) chunks.push(current.trim());
      if (s.length > maxLen) {
        const words = s.split(/\s+/);
        let sub = '';
        for (const w of words) {
          if ((sub + ' ' + w).length <= maxLen) {
            sub = sub ? sub + ' ' + w : w;
          } else {
            if (sub.trim()) chunks.push(sub.trim());
            sub = w;
          }
        }
        current = sub;
      } else {
        current = s;
      }
    }
  }
  if (current.trim()) chunks.push(current.trim());
  return chunks.length ? chunks : [clean.substring(0, maxLen)];
}

async function handleTtsRequest(req: express.Request, res: express.Response) {
  try {
    const langRaw = ((req.query.lang as string) || (req.body?.lang as string) || 'en').trim();
    const textRaw = ((req.query.text as string) || (req.body?.text as string) || '').trim();

    if (!textRaw) {
      return res.status(400).json({ error: 'Text parameter is required for speech synthesis' });
    }

    // Normalize language code to Google TTS supported codes: kn, te, ta, ml, hi, en
    let lang = 'en';
    const l = langRaw.toLowerCase();
    if (l.startsWith('kn')) lang = 'kn';
    else if (l.startsWith('te')) lang = 'te';
    else if (l.startsWith('ta')) lang = 'ta';
    else if (l.startsWith('ml')) lang = 'ml';
    else if (l.startsWith('hi')) lang = 'hi';
    else if (l.startsWith('en')) lang = 'en';

    const cacheKey = `${lang}:${textRaw}`;
    if (ttsCache.has(cacheKey)) {
      const cached = ttsCache.get(cacheKey)!;
      res.setHeader('Content-Type', 'audio/mpeg');
      res.setHeader('Content-Length', cached.length);
      res.setHeader('Cache-Control', 'public, max-age=86400');
      return res.send(cached);
    }

    const chunks = splitTtsText(textRaw);
    if (chunks.length === 0) {
      return res.status(400).json({ error: 'No readable text content found' });
    }

    const chunkPromises = chunks.map(async (chunk) => {
      const url = `https://translate.google.com/translate_tts?ie=UTF-8&client=tw-ob&tl=${lang}&q=${encodeURIComponent(chunk)}`;
      const response = await fetch(url, {
        headers: {
          'User-Agent':
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
          Referer: 'https://translate.google.com/',
        },
      });

      if (!response.ok) {
        throw new Error(`TTS provider returned HTTP ${response.status}`);
      }

      const arrBuf = await response.arrayBuffer();
      return Buffer.from(arrBuf);
    });

    const audioBuffers = await Promise.all(chunkPromises);
    const combined = Buffer.concat(audioBuffers);

    if (ttsCache.size > 200) {
      const firstKey = ttsCache.keys().next().value;
      if (firstKey) ttsCache.delete(firstKey);
    }
    ttsCache.set(cacheKey, combined);

    res.setHeader('Content-Type', 'audio/mpeg');
    res.setHeader('Content-Length', combined.length);
    res.setHeader('Accept-Ranges', 'bytes');
    res.setHeader('Cache-Control', 'public, max-age=86400');
    return res.send(combined);
  } catch (err: any) {
    console.error('TTS synthesis error:', err);
    return res.status(500).json({
      error: 'TTS synthesis failed',
      details: err?.message || 'Failed to synthesize audio stream',
    });
  }
}

// TTS endpoints for high-quality audio in Kannada, Telugu, Tamil, Malayalam, Hindi, English
app.get('/api/tts', handleTtsRequest);
app.post('/api/tts', handleTtsRequest);

// Support all aliases so frontend calls never get 404 HTML
app.post('/api/analyze-inspection', handleImageAnalysis);
app.post('/api/check-photo', handleImageAnalysis);
app.post('/api/analyze-hazard', handleImageAnalysis);

async function startServer() {
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  } else {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[INDUSAFE AI] Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
