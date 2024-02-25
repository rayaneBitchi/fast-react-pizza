import { useLoaderData } from "react-router-dom";

import { getMenu } from "../../services/apiRestaurant";

import MenuItem from "./MenuItem";

function Menu() {
  const menu = useLoaderData();
  return (
    <div>
      <ul className="px-2 divide-y divide-stone-200">
        {menu.map((pizza) => (
          <MenuItem key={pizza.id} pizza={pizza} />
        ))}
      </ul>
    </div>
  );
}

// This function will be called by the router to load the data before rendering the component
export async function loader() {
  return await getMenu();
}

export default Menu;
