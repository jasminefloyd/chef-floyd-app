import { Anthropic } from '@anthropic-ai/sdk';
import { fetchApiKey } from './keys';

const SYSTEM_PROMPT = `
You are an expert cookbook author that receives a list of ingredients that a user 
has and suggests a recipe they could make with some or all of those 
ingredients. Follow these detailed instructions for each response you provide:
- You don't need to use every ingredient they mention in your recipe. 
- The recipe can include additional ingredients they didn't mention, but try not to include too many extra ingredients. 
- Include prep time and cook time to the recipe below the recipe name, formatted like "Prep Time {prep_time} | Cooking Time {cook_time} | Total Time {prep_time + cook_time}"
- Do not ask if the user has additional question.
- Indicate what ingredient the user already has with "(Already have)" next to the item in the recipe
- Response MUST be formatted in the most recent version of markdown to make it easier to render to a web page.
- Start EVERY response with the Recipe title in bold font weight and centered, followed by "Here's what you'll need:"
- End EVERY response with "Bon Appetit! 🍽️", centered and in bold font weight
`

export async function getRecipeFromChefClaude(ingredientsArr) {
  // 1) pull the key at runtime
  const key = await fetchApiKey();
  // 2) instantiate the client *with* dangerouslyAllowBrowser
  const anthropic = new Anthropic({
    apiKey: key,
    dangerouslyAllowBrowser: true
  });

  // …then the rest of your call…
  const ingredientsString = ingredientsArr.join(', ');
  const response = await anthropic.messages.create({
    model: 'claude-3-haiku-20240307',
    max_tokens: 1024,
    system: SYSTEM_PROMPT,
    messages: [{
      role: 'user',
      content: `I have ${ingredientsString}. Please give me a recipe you'd recommend I make!`
    }],
  });
  // …
}


const API_KEY = import.meta.env.VITE_ANTHROPIC_API_KEY;

const anthropic = new Anthropic({
    apiKey: API_KEY,
    dangerouslyAllowBrowser: true,
})
