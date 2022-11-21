export const PRODUCT_QUERY = `
query{
    services{
      data {
        attributes{
          Title,
          Price,
          Description,
          Slug,
          Images{
            data{
              attributes{
                formats
              }
            }
          }
        }
      }
    }
  }`;

export const GET_SERVICE_QUERY = `
    query getService($Slug: String!){
      services(filters: {Slug: {eq: $Slug}}) {
        data {
          attributes{
            Title,
            Price,
            Description,
            Slug,
            Images{
              data{
                attributes{
                  formats
                }
              }
            }
          }
        }
        
      }
    }
  `;
