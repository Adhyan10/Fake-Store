import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";
import { useCart } from "../../hooks/useCart";
import { formatCurrency } from "../../utils/helpers";

const schema = yup.object({
  fullName: yup.string().required("Name is required"),
  email: yup
    .string()
    .email("Enter a valid email")
    .required("Email is required"),
  address: yup
    .string()
    .min(8, "Address is too short")
    .required("Address is required"),
});

function Checkout() {
  const navigate = useNavigate();
  const { cartItems, subtotal, clearCart } = useCart();

  const tax = useMemo(() => subtotal * 0.1, [subtotal]);
  const total = useMemo(() => subtotal + tax, [subtotal, tax]);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async () => {
    if (!cartItems.length) {
      toast.error("Your cart is empty.");
      return;
    }

    const orderId = uuidv4().slice(0, 8).toUpperCase();
    toast.success(`Order placed successfully! ID: ${orderId}`);
    clearCart();
    navigate("/products");
  };

  return (
    <main className="page-wrap checkout-layout">
      <section>
        <h1>Checkout</h1>
        <form className="checkout-form" onSubmit={handleSubmit(onSubmit)}>
          <label>
            Full Name
            <input type="text" {...register("fullName")} />
            {errors.fullName && (
              <span className="error-text">{errors.fullName.message}</span>
            )}
          </label>

          <label>
            Email
            <input type="email" {...register("email")} />
            {errors.email && (
              <span className="error-text">{errors.email.message}</span>
            )}
          </label>

          <label>
            Address
            <textarea rows={4} {...register("address")} />
            {errors.address && (
              <span className="error-text">{errors.address.message}</span>
            )}
          </label>

          <button type="submit" className="primary-btn" disabled={isSubmitting}>
            Place Order
          </button>
        </form>
      </section>

      <aside className="summary-card">
        <h2>Order Summary</h2>
        {cartItems.map((item) => (
          <p key={item.productId}>
            <span>
              {item.title} x {item.quantity}
            </span>
            <strong>{formatCurrency(item.price * item.quantity)}</strong>
          </p>
        ))}

        <hr />

        <p>
          <span>Subtotal</span>
          <strong>{formatCurrency(subtotal)}</strong>
        </p>
        <p>
          <span>Tax</span>
          <strong>{formatCurrency(tax)}</strong>
        </p>
        <p className="summary-total">
          <span>Total</span>
          <strong>{formatCurrency(total)}</strong>
        </p>
      </aside>
    </main>
  );
}

export default Checkout;
