import React from "react";
import { checkboxesData, checkBoxType } from "../NestedCheckBox.config";

interface CheckboxProps {
  data: checkBoxType[];
  checked: Record<number, boolean>;
  setChecked: React.Dispatch<React.SetStateAction<Record<number, boolean>>>;
}

function CheckBoxRendering({ data, checked, setChecked }: CheckboxProps) {
  const handleOnChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    checkbox: checkBoxType
  ) => {
    const isChecked = e.target.checked;

    setChecked((prev) => {
      const newState = { ...prev, [checkbox.id]: isChecked };

      const updateChildren = (node: checkBoxType) => {
        if (node.children) {
          node.children.forEach((child: checkBoxType) => {
            newState[child.id] = isChecked;
            updateChildren(child);
          });
        }
      };

      updateChildren(checkbox);

      const updateParentStates = (nodes: checkBoxType[]) => {
        for (const node of nodes) {
          if (node.children) {
            updateParentStates(node.children);

            const allChildrenChecked = node.children.every(
              (child: checkBoxType) => newState[child.id]
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
    <div className="space-y-2">
      {data.map((checkbox: checkBoxType) => (
        <div key={checkbox.id} className="pl-2 border-l border-gray-300">
          <label className="flex items-center gap-2 text-sm font-medium">
            <input
              type="checkbox"
              checked={checked[checkbox.id] || false}
              onChange={(e) => handleOnChange(e, checkbox)}
              className="w-4 h-4 cursor-pointer"
            />
            {checkbox.name}
          </label>

          {checkbox.children && (
            <div className="ml-4 mt-1">
              <CheckBoxRendering
                data={checkbox.children}
                checked={checked}
                setChecked={setChecked}
              />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default CheckBoxRendering;
