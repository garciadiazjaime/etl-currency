import extract from '../util/extract';
import load from '../util/load';

// const sourceUrl = 'https://www.airbnb.com/api/v2/explore_tabs?version=1.3.5&_format=for_explore_search_web&experiences_per_grid=20&items_per_grid=18&guidebooks_per_grid=20&auto_ib=false&fetch_filters=true&has_zero_guest_treatment=false&is_guided_search=true&is_new_cards_experiment=true&luxury_pre_launch=false&query_understanding_enabled=true&show_groupings=true&supports_for_you_v3=true&timezone_offset=-300&client_session_id=5c6f3771-ca2f-4b5a-9530-c6066a9904fa&metadata_only=false&is_standard_search=true&refinement_paths%5B%5D=%2Fhomes&selected_tab_id=home_tab&allow_override%5B%5D=&map_toggle=false&s_tag=1GzbW4VB&last_search_session_id=a94738d4-df1a-4a0a-aed7-bddd69860749&federated_search_session_id=210a430c-4a86-48fd-b66f-311967266957&screen_size=medium&query=Tijuana%2C+Mexico&_intents=p1&key=d306zoyjsyarp7ifhu67rjxn52tv0t20&currency=USD&locale=en';
const sourceUrl = 'https://www.airbnb.com/api/v2/explore_tabs?&items_per_grid=30&client_session_id=5c6f3771-ca2f-4b5a-9530-c6066a9904fa&metadata_only=false&is_standard_search=true&refinement_paths%5B%5D=%2Fhomes&selected_tab_id=home_tab&allow_override%5B%5D=&map_toggle=false&s_tag=1GzbW4VB&last_search_session_id=a94738d4-df1a-4a0a-aed7-bddd69860749&federated_search_session_id=210a430c-4a86-48fd-b66f-311967266957&query=Tijuana%2C+Mexico&_intents=p1&key=d306zoyjsyarp7ifhu67rjxn52tv0t20&currency=USD&locale=en';
const offsetParam = '&section_offset=';

class AirbnbTransformer {
  static async extract(props) {
    const response = await extract(props);
    return JSON.parse(response);
  }

  static transform(data) {
    const { listings } = data.explore_tabs[0].sections.filter(item => item.result_type === 'listings')[0];
    return listings.map(item => ({
      id: item.listing.id,
      bathrooms: item.listing.bathrooms,
      bedrooms: item.listing.bedrooms,
      city: item.listing.city,
      lat: item.listing.lat,
      lng: item.listing.lng,
      title: item.listing.name,
      pictures: item.listing.picture_urls,
      rating: item.listing.star_rating,
      userId: item.listing.user.id,
      price: item.pricing_quote.rate.amount,
      currency: item.pricing_quote.rate.currency,
      rateType: item.pricing_quote.rate_type,
    }));
  }

  static load(props, data) {
    return load(props, data);
  }

  static getPagination(data) {
    return data.explore_tabs[0].pagination_metadata;
  }

  static shouldRunAgain(maxTries, offset, data) {
    return offset < maxTries && !!data.has_next_page;
  }

  static getSourceUrl(offset) {
    return !offset ? sourceUrl : `${sourceUrl}${offsetParam}${offset}`;
  }

  static async run(maxTries, offset) {
    const props = {
      isProduction: true,
      file: './stubs/airbnb.json',
      sourceUrl: AirbnbTransformer.getSourceUrl(offset),
      apiUrl: 'http://127.0.0.1:3000/rates/airbnb',
    };
    const response = await AirbnbTransformer.extract(props);

    const listings = AirbnbTransformer.transform(response);
    // console.log(listings.map(item => `${item.id} - ${item.title} - ${item.rateType}`));

    await AirbnbTransformer.load(props, listings);

    const pagination = AirbnbTransformer.getPagination(response);
    if (AirbnbTransformer.shouldRunAgain(maxTries, offset, pagination)) {
      AirbnbTransformer.run(maxTries, offset + 1);
    }
    return listings;
  }
}

async function main() {
  const offset = 0;
  const maxTries = 3;
  AirbnbTransformer.run(maxTries, offset);
}

main();
