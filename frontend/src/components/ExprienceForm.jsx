import { Briefcase, Plus, Sparkles, Trash2 } from "lucide-react";
import React from "react";

const ExprienceForm = ({ data, onChange }) => {
  const addExprience = () => {
    const newExprience = {
      company: "",
      position: "",
      start_date: "",
      end_date: "",
      description: "",
      is_current: false,
    };
    onChange([...data, newExprience]);
  };

  const removeExprience = (index) => {
    const updated = data.filter((_, i) => i !== index);
    onChange(updated);
  };

  const updateExprience = (index, field, value) => {
    const updated = [...data];
    updated[index] = { ...updated[index], [field]: value };
    onChange(updated);
  };
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="flex items-center gap-2 text-lg font-semibold text-gray-900">
            {" "}
            Professional Experience{" "}
          </h3>
          <p className="text-sm text-gray-500">Add your job experience</p>
        </div>
        <button
          onClick={() => addExprience()}
          className="flex items-center gap-2 px-3 py-1 text-sm bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors"
        >
          <Plus className="size-4" />
          Add Experience
        </button>
      </div>

      {data.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          <Briefcase className="w-12 h-12 mx-auto mb-3 text-gray-300" />
          <p>No work experience added yet.</p>
          <p className="text-sm">Click "Add Experience" to get started.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {data.map((experience, index) => (
            <div
              key={index}
              className="p-4 border border-gray-200 rounded-lg space-y-3"
            >
              <div className="flex justify-between items-start">
                <h4>Exprience #{index + 1}</h4>
                <button
                  onClick={() => removeExprience(index)}
                  className="text-red-500 hover:text-red-700 transition-colors"
                >
                  <Trash2 className="size-4" />
                </button>
              </div>

              <div className="grid md:grid-cols-2 gap-3">
                <input
                  value={experience.company || ""}
                  onChange={(e) =>
                    updateExprience(index, "company", e.target.value)
                  }
                  className="px-3 py-2 text-sm rounded-lg"
                  type="text"
                  placeholder="Company Name"
                />

                <input
                  value={experience.position || ""}
                  onChange={(e) =>
                    updateExprience(index, "position", e.target.value)
                  }
                  className="px-3 py-2 text-sm rounded-lg"
                  type="text"
                  placeholder="position Name"
                />

                <input
                  value={experience.start_date || ""}
                  onChange={(e) =>
                    updateExprience(index, "start_date", e.target.value)
                  }
                  className="px-3 py-2 text-sm rounded-lg"
                  type="month"
                  placeholder="start_date Name"
                />

                <input
                  value={experience.end_date || ""}
                  onChange={(e) =>
                    updateExprience(index, "end_date", e.target.value)
                  }
                  className="px-3 py-2 text-sm rounded-lg"
                  type="month"
                  disabled={experience.is_current}
                  placeholder="end_date Name"
                />
              </div>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={experience.is_current || false}
                  onChange={(e) => {
                    updateExprience(
                      index,
                      "is_current",
                      e.target.checked ? true : false
                    );
                  }}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-sm text-gray-700">
                  Currently working here
                </span>
              </label>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium text-gray-700">
                    Job Description
                  </label>
                  <button className="flex items-center gap-1 px-2 py-1 text-xs bg-purple-100 text-purple-700 rounded hover:bg-purple-200 transition-colors disabled:opacity-50">
                    <Sparkles className="h-3 w-3" />
                    Enhance with AI
                  </button>
                </div>
                <textarea
                  value={experience.description || ""}
                  onChange={(e) =>
                    updateExprience(index, "description", e.target.value)
                  }
                  rows={4}
                  className="w-full text-sm px-3 py-2 rounded-lg border border-gray-300 focus:ring focus:ring-blue-500 focus:border-blue-500 outline-none resize-none"
                  placeholder="Describe your key responsibilities and achievements..."
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ExprienceForm;
