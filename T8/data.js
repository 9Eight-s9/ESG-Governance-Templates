/* Source: Ch 24 updated.docx. Static content for Carbon Calculator only. */
'use strict';
window.ESG_DATA = Object.freeze({
  "version": 1,
  "toolId": "carbon-calculator",
  "title": "Carbon Calculator",
  "logoPath": "assets/logo.png",
  "chapters": [
    {
      "number": 24,
      "title": "Environmental Responsibility at Home & Beyond",
      "pillar": "Environmental",
      "paragraphs": [
        "Everyday choices about electricity, fuel, travel, food, water, purchases and waste collectively affect emissions, resources and ecosystems. The aim is measurable improvement—not an overnight perfect lifestyle.",
        "1. What does environmental responsibility mean?",
        "The environmental pillar covers emissions, energy, water, waste, pollution, resources and biodiversity. Personal responsibility includes direct choices (energy use, food waste), shared decisions (household waste and community transport) and systemic conditions (electricity supply, recycling infrastructure and public policy). Individual action matters but cannot replace organisational and government action.",
        "A carbon footprint estimates greenhouse-gas emissions in kg or tonnes of CO₂ equivalent (CO₂e). The broader environmental footprint also includes water, materials, pollution, waste and biodiversity. Reducing carbon alone does not capture every environmental impact.",
        "2. Household carbon-footprint calculator?",
        "Core formula: Estimated emissions (kg CO₂e) = Activity quantity × applicable emission factor (kg CO₂e per unit). Divide kilograms by 1,000 for tonnes.",
        "Step 1 - Boundary: Define the household or person, location, assessment period (ideally 12 months), activities covered and any method used to allocate shared emissions per person.",
        "Step 2 - Data: Gather electricity bills (kWh), cooking fuel (kg or volume), vehicle fuel (litres), public transport (passenger-km), flights (journey details) and other significant sources. Mark measured versus estimated figures. Avoid double-counting, especially EV charging already included in electricity bills.",
        "Step 3 - Factors: Select location-, year- and activity-appropriate emission factors from credible government, energy, transport or GHG-accounting sources. Record the source, year, unit, assumptions and scope; avoid mixing incompatible methodologies.",
        "Step 4 - Calculate: Multiply each activity by its corresponding factor. Electricity uses kWh; cooking and vehicle fuel use the relevant fuel quantity; public transport uses passenger distance and mode; flights require an appropriate aviation methodology. Include other consumption only where reliable data exist.",
        "Step 5 - Consolidate and interpret: Add the estimated sources, disclose omissions and uncertainties, and compare periods only when methods and circumstances are comparable. The footprint is a planning estimate, not a verified or exact measurement.",
        "3. Practical ways to reduce environmental impact:",
        "Energy: Switch off unused equipment, maintain appliances, review bills and consider efficient replacements or renewables when financially and technically sensible. Account for the impact of manufacturing a replacement.",
        "Water: Fix leaks, monitor use and avoid waste. Use rainwater or greywater systems only where safe, compliant and appropriately maintained.",
        "Waste and food: Prevent waste before recycling; plan meals, store food properly, reuse or repair goods, donate usable items and segregate waste. Dispose of batteries and electronics through authorised channels; compost appropriately where feasible.",
        "Purchasing: Buy only what is needed. Prefer durable, repairable items; assess credible evidence behind environmental claims and consider end-of-life disposal.",
        "Nature: Protect existing trees, wetlands and habitats; avoid pollution and support suitable local planting or conservation. Judge planting by ecological suitability and survival, not sapling counts.",
        "4. Convert measurement into an action plan:",
        "For each priority record: baseline → action → measurable target → responsible person → review date. Example: track monthly electricity bills and eliminate avoidable usage; record discarded food for four weeks; identify an authorised e-waste collection point. Review progress monthly, accounting for weather, travel, cost and health needs. Never compromise safety or essential living conditions for a target.",
        "5. Shared responsibility and limitations:",
        "People may lack affordable clean energy, reliable transport, recycling facilities or repair services. Businesses must improve product design and information; public institutions must support infrastructure and standards. A household calculator is a learning and decision-support tool not a judgement of personal worth or a substitute for policy.",
        "Key Takeaway: Measure the largest practical sources, use transparent factors, acknowledge uncertainty, reduce avoidable consumption and track progress. Include water, waste and biodiversity alongside carbon; combine personal effort with collective change.",
        "Practical exercise and reflection:",
        "Define your assessment boundary; collect energy and travel records; identify and document factors; estimate emissions; track three non-carbon indicators; select three actions with owners, targets and dates; review after one month. Ask: What contributes most? What can change immediately? What depends on wider systems? Which missing data would improve confidence? How will you distinguish genuine improvement from seasonal or lifestyle changes?"
      ]
    }
  ],
  "carbonSources": [
    {
      "id": "electricity",
      "name": "Electricity",
      "unit": "kWh"
    },
    {
      "id": "cooking",
      "name": "Cooking fuel",
      "unit": ""
    },
    {
      "id": "vehicle",
      "name": "Private vehicle",
      "unit": ""
    },
    {
      "id": "transport",
      "name": "Public transport",
      "unit": "passenger-km"
    },
    {
      "id": "air",
      "name": "Air travel",
      "unit": ""
    },
    {
      "id": "other",
      "name": "Other significant sources",
      "unit": ""
    }
  ]
});
