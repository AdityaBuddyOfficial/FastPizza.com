import { useLoaderData } from "react-router-dom";
import { getMenu } from "../../services/apiRestaurant";
import MenuItem from "./MenuItem";

function Menu() {
  const menu: any = useLoaderData();

  return (
    <ul>
      {menu.map((pizza: any) => (
        <MenuItem pizza={pizza} key={pizza.ket} />
      ))}
    </ul>
  );
}
export async function loader() {
  const menu = await getMenu();
  return menu;
}
export default Menu;
