// https://uibakery.io/regex-library/phone-number
// eslint-disable-next-line no-unused-vars

import { Form, redirect, useActionData, useNavigation } from "react-router-dom";
import { createOrder } from "../../services/apiRestaurant";

const isValidPhone = (str: any) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str
  );

const fakeCart: any = [
  {
    pizzaId: 12,
    name: "Mediterranean",
    quantity: 2,
    unitPrice: 16,
    totalPrice: 32,
  },
  {
    pizzaId: 6,
    name: "Vegetale",
    quantity: 1,
    unitPrice: 13,
    totalPrice: 13,
  },
  {
    pizzaId: 11,
    name: "Spinach and Mushroom",
    quantity: 1,
    unitPrice: 15,
    totalPrice: 15,
  },
];

function CreateOrder() {
  const navigation = useNavigation();
  console.log("🚀 ~ navigation in the create order:", navigation);
  const isSubmitting = navigation.state === "submitting";
  console.log("🚀 ~ isSubmitting:", isSubmitting);
  // const [withPriority, setWithPriority] = useState(false);

  const formErrors = useActionData();

  const cart: any = fakeCart;

  return (
    <div>
      <h2>Ready to order? Let's go!</h2>

      {/* <Form method="POST" action="/order/new">
       */}
      <Form method="POST">
        <div>
          <label>First Name</label>
          <input type="text" name="customer" required />
        </div>

        <div>
          <label>Phone number</label>
          <div>
            <input type="tel" name="phone" required />
          </div>
          {formErrors?.phone && <p>{formErrors.phone}</p>}
        </div>

        <div>
          <label>Address</label>
          <div>
            <input type="text" name="address" required />
          </div>
        </div>

        <div>
          <input
            type="checkbox"
            name="priority"
            id="priority"
            // value={withPriority}
            // onChange={(e) => setWithPriority(e.target.checked)}
          />
          <label htmlFor="priority">Want to yo give your order priority?</label>
        </div>

        <div>
          <input type="hidden" name="cart" value={JSON.stringify(cart)} />

          <button disabled={isSubmitting}>
            {isSubmitting ? "Placing Order" : "Order now"}
          </button>
        </div>
      </Form>
    </div>
  );
}

export async function action({ request }: any) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  console.log("🚀 ~ action ~ formData:", data);

  const order = {
    ...data,
    cart: JSON.parse(data.cart),
    priority: data.priority === "on",
  };
  const error = {};
  if (!isValidPhone(order.phone))
    error.phone =
      "Please give us your correct phone number. We might need it to contact you.";
  if (Object.keys(error).length > 0) return error;
  // if everything is ok create new order and redirect

  const newOrder = await createOrder(order);
  console.log("🚀 ~ action ~ orderResponse:", newOrder);

  return redirect(`/order/${newOrder.id}`);
}
export default CreateOrder;
