interface FieldProps {
  label: string;
  type?: string;
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
}

export function Field({
  label,
  type = "text",
  placeholder,
  value,
  onChange,
}: FieldProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm text-gray-500">{label}</label>
      <input
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="rounded-lg border border-gray-200 px-3.5 py-2.5 text-sm text-blue-600 placeholder:text-blue-300 outline-none focus:border-blue-400"
      />
    </div>
  );
}
