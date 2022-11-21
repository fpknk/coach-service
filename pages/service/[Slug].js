import { useRouter } from 'next/router';
import React from 'react';
import { useQuery } from 'urql';
import { GET_SERVICE_QUERY } from '../../lib/query';

import {
  DetailsStyle,
  ProductInfo,
  Quantity,
  Buy,
} from '../../styles/ServiceDetails';
import { AiFillPlusCircle, AiFillMinusCircle } from 'react-icons/ai';

import ShopContext from '../../lib/context';
import { useContext } from 'react';
import toast, { Toaster } from 'react-hot-toast';

export default function ServiceDetails() {
  //use State / useContext
  const { qty, increaseQty, decreaseQty, onAdd } = useContext(ShopContext);
  // console.log(qty);
  //Fetch Slug
  const { query } = useRouter();
  // console.log(router);
  // console.log(query);

  //Fetch Graphql data
  const [results] = useQuery({
    query: GET_SERVICE_QUERY,
    variables: { Slug: query.Slug },
    // query.Slug
  });
  const { data, fetching, error } = results;
  // console.log(results);
  //Check for the data coming in
  if (fetching) return <p>Loading...</p>;
  if (error) return <p>Oh no...{error.message}</p>;
  const services = data.services.data;

  // console.log(services);
  //Extra our data
  // console.log(data);
  const { Title, Description, Images } = data.services.data[0].attributes;
  console.log(data.services.data[0].attributes);

  //Create a toast

  const notify = () => {
    toast.success(`${Title} added to your cart`, {
      duration: 1500,
    });
  };

  return (
    <DetailsStyle>
      <img src={Images.data.attributes.formats.medium.url} alt={Title} />
      <ProductInfo>
        <h3>{Title}</h3>
        <p>{Description}</p>
        <Quantity>
          <span>Quantity</span>
          <button>
            <AiFillMinusCircle onClick={decreaseQty} />
          </button>
          <p>{qty}</p>
          <button>
            <AiFillPlusCircle onClick={increaseQty} />
          </button>
        </Quantity>
        <Buy
          onClick={() => {
            onAdd(data.services.data[0].attributes, qty);
            notify();
          }}
        >
          Add to cart
        </Buy>
      </ProductInfo>
    </DetailsStyle>
  );
}
