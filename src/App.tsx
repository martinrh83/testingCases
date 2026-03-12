import "./App.css";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import type { SubmitHandler } from "react-hook-form";
import { useForm } from "react-hook-form";
import { z } from "zod";

const schema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  email: z.email({ message: "Invalid email address" }),
  terms: z.boolean().refine((val) => val, {
    message: "You must accept the terms",
  }),
});

type FormData = z.infer<typeof schema>;

function App() {
  const [showInfo, setShowInfo] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<FormData> = (data) => {
    alert("Submitted: " + JSON.stringify(data, null, 2));
    reset();
  };

  return (
    <div style={{ maxWidth: 400, margin: "auto" }}>
      <h1>Simple React Hook Form</h1>
      <p
        onMouseEnter={() => setShowInfo(true)}
        onMouseLeave={() => setShowInfo(false)}
      >
        Mas info
      </p>
      {showInfo && (
        <div>
          Este es un formulario de ejemplo usando React Hook Form y Zod para
          validación.
        </div>
      )}
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        {/* Name field */}
        <div style={{ marginBottom: 16 }}>
          <label htmlFor="name">Name:</label>
          <input
            id="name"
            type="text"
            {...register("name")}
            style={{ display: "block", width: "100%" }}
          />
          {errors.name && (
            <span style={{ color: "red" }}>{errors.name.message}</span>
          )}
        </div>
        {/* Email field */}
        <div style={{ marginBottom: 16 }}>
          <label htmlFor="email">Email:</label>
          <input
            id="email"
            type="email"
            {...register("email")}
            style={{ display: "block", width: "100%" }}
          />
          {errors.email && (
            <span style={{ color: "red" }}>{errors.email.message}</span>
          )}
        </div>
        {/* Terms (checkbox) */}
        <div style={{ marginBottom: 16 }}>
          <label htmlFor="terms" style={{ display: "block" }}>
            <input
              id="terms"
              type="checkbox"
              {...register("terms")}
              style={{ marginRight: 8 }}
            />
            Accept terms
          </label>
          {errors.terms && (
            <span style={{ color: "red" }}>{errors.terms.message}</span>
          )}
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default App;
