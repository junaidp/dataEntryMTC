import axios from "axios";
import Papa from "papaparse";

export const onBoardingFirstCall = async (data, thunkAPI) => {
  try {
    const res = await fetch("/file.csv");
    const text = await res.text();

    const parseCSV = (text) => {
      return new Promise((resolve) => {
        Papa.parse(text, {
          complete: (result) => resolve(result.data),
          header: true,
        });
      });
    };

    const csvData = await parseCSV(text);

    const apiKey = import.meta.env.VITE_OPENAI_API_KEY;
    const prompt = `You are an AI data analyst. Your task is to analyze the provided customers' personal information and CSV data, then return a structured JSON response.

### **INPUT DATA**
1️⃣ **CSV Data:** ${JSON.stringify(csvData)}
2️⃣ **Customers Personal Info:** ${JSON.stringify(data?.customers)}

### **TASK**
- Extract **'data point used'** column values relevant to each customer.
- Analyze the **'Reasoning'** and **'Refinement Considerations'** columns.
- Answer the questions from the **'Goals'** column.
- Generate insights about **date of birth, place of birth, gender, email, phone number, city of residence, and combined identity**.
- **DO NOT** return explanations, only structured JSON.

### **STRICT JSON FORMAT**
Strictly return the response in this exact JSON structure:
[
  {
    "name": "<string>",
    "dateOfBirth": {
      "exactAge": <number>,
      "timeBeforeNextBirthday": "<string> days",
      "lifeMilestones": "<string>",
      "culturalTouchstones": "<string>",
      "legalAdultStatus": "<string>",
      "ageRestrictions": "<string>"
    },
    "placeOfBirth": {
      "countryOfBirth": "<string>",
      "likelyLanguages": ["<string>", "<string>"]
    },
    "gender": {
      "likelyPronouns": "<string>"
    },
    "email": {
      "placeOfWork": "<string>",
      "digitalFamiliarity": "<string>"
    },
    "phoneNumber": {
      "countryLinked": "<string>",
      "internationalConnections": "<string>"
    },
    "cityOfResidence": {
      "countryOfResidence": "<string>",
      "likelyLanguages": ["<string>", "<string>"],
      "presentDayEnvironment": "<string>",
      "lifeStyle": "<string>"
    },
    "combined": {
      "emailAndFullName": "<string>",
      "emailAndAge": "<string>",
      "rootedness": "<string>",
      "culturalRoots": "<string>",
      "livingStyle": "<string>",
      "demographicPreferences": "<string>",
      "lifeNarrative": "<string>",
      "selfExpression": "<string>",
      "culturalConnections": "<string>",
      "careerStatus": "<string>"
    }
  }
]

### **RULES**
- **DO NOT** add extra explanations.
- **DO NOT** include additional text outside the JSON object.
- **Ensure valid JSON format** (no missing commas, quotes, or brackets).`;

    const openAIResponse = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-4",
        messages: [{ role: "user", content: prompt }],
        temperature: 0.7,
      },
      {
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
      }
    );
    return openAIResponse.data.choices[0].message.content;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
};


export const onBoardingSecondCall = async (data, thunkAPI) => {
  try {
    let props = await axios.post(
      `https://mtcv2-production-cefa.up.railway.app/generate_response/`,
      {
        input_data: {
          ...data,
        },
      },
      { timeout: 1800000 }
    );
    return props.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
};

export const chat = async (data, thunkAPI) => {
  try {
    let props = await axios.post(`${BASE_URL}/onBoard/chat`, {
      query: data?.query,
      session_id: data?.sessionId,
      customerId: data?.customerId || "66332bb85725cd245aab4459",
      group: data?.group,
    });
    return props.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
};
export const signIn = async (data, thunkAPI) => {
  try {
    let props = await axios.get(`${BASE_URL}/onBoard/signIn${data}`);
    return props.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
};
