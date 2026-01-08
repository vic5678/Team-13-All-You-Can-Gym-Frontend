import React from "react";
import ClearableInput from "./ClearableInput";

export default function SessionFormFields({ form, handleChange, setForm, trainerMarginBottom = 14 }) {
  return (
    <>
      {/* DESCRIPTION */}
      <ClearableInput
        label="Description"
        type="text"
        name="description"
        placeholder="Description"
        value={form.description}
        onChange={handleChange}
        onClear={() => setForm((prev) => ({ ...prev, description: "" }))}
      />

      {/* TYPE */}
      <ClearableInput
        label="Type"
        type="text"
        name="type"
        placeholder="Type"
        value={form.type}
        onChange={handleChange}
        onClear={() => setForm((prev) => ({ ...prev, type: "" }))}
      />

      {/* CAPACITY */}
      <ClearableInput
        label="Capacity"
        type="number"
        name="capacity"
        placeholder="Capacity"
        value={form.capacity}
        onChange={handleChange}
        onClear={() => setForm((prev) => ({ ...prev, capacity: "" }))}
      />

      {/* TRAINER */}
      <div style={{ marginBottom: trainerMarginBottom }}>
        <ClearableInput
          label="Trainer's Name"
          type="text"
          name="trainer"
          placeholder="Trainer's Name"
          value={form.trainer}
          onChange={handleChange}
          onClear={() => setForm((prev) => ({ ...prev, trainer: "" }))}
        />
      </div>
    </>
  );
}
