import { checkboxesData } from "../NestedCheckBox.config";

/* eslint-disable @typescript-eslint/no-explicit-any */
interface CheckboxProps {
  data: any;
  checked: Record<number, boolean>;
  setChecked: React.Dispatch<React.SetStateAction<Record<number, boolean>>>;
}

function CheckBoxRendering({ data, checked, setChecked }: CheckboxProps) {
  const handleOnChange = (e, checkbox) => {
    const isChecked = e.target.checked;

    setChecked((prev) => {
      const newState = { ...prev, [checkbox.id]: isChecked };

      const updateChildren = (node) => {
        if (node.children) {
          node.children.forEach((child) => {
            newState[child.id] = isChecked;
            updateChildren(child);
          });
        }
      };

      updateChildren(checkbox);

      const updateParentStates = (nodes) => {
        for (const node of nodes) {
          if (node.children) {
            updateParentStates(node.children);

            const allChildrenChecked = node.children.every(
              (child) => newState[child.id]
            );
            newState[node.id] = allChildrenChecked;
          }
        }
      };

      updateParentStates(checkboxesData);
      return newState;
    });
  };

  return (
    <div>
      {data.map((checkbox: any) => (
        <div key={checkbox.id}>
          <label>
            <input
              type="checkbox"
              checked={checked[checkbox.id] || false}
              onChange={(e) => handleOnChange(e, checkbox)}
            />
            {checkbox.name}
          </label>

          <div style={{ marginLeft: "20px" }}>
            {checkbox.children && (
              <CheckBoxRendering
                data={checkbox.children}
                checked={checked}
                setChecked={setChecked}
              />
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

export default CheckBoxRendering;
