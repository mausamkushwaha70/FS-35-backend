import React from "react";
import {
  Building2,
  Mail,
  MapPin,
  Phone,
  Briefcase,
  BadgeCheck,
} from "lucide-react";

const EmployeeCard = ({ employee }) => {
  return (
    <div className="w-full max-w-md rounded-2xl border border-gray-200 bg-white p-6 shadow-md transition-all hover:shadow-xl">
      {/* Header */}
      <div className="flex items-center gap-4">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-blue-100 text-xl font-bold text-blue-600">
          {employee.employeeName?.charAt(0)}
        </div>

        <div>
          <h2 className="text-xl font-bold text-gray-800">
            {employee.employeeName}
          </h2>

          <span
            className={`mt-1 inline-block rounded-full px-3 py-1 text-xs font-semibold ${
              employee.designation === "MANAGER"
                ? "bg-green-100 text-green-700"
                : "bg-blue-100 text-blue-700"
            }`}
          >
            {employee.designation}
          </span>
        </div>
      </div>

      {/* Details */}
      <div className="mt-6 space-y-4">
        <div className="flex items-center gap-3 text-gray-600">
          <BadgeCheck size={18} />
          <span>{employee.employeeId}</span>
        </div>

        <div className="flex items-center gap-3 text-gray-600">
          <Mail size={18} />
          <span>{employee.email}</span>
        </div>

        <div className="flex items-center gap-3 text-gray-600">
          <Phone size={18} />
          <span>{employee.mobile}</span>
        </div>

        <div className="flex items-center gap-3 text-gray-600">
          <Building2 size={18} />
          <span>{employee.company}</span>
        </div>

        <div className="flex items-center gap-3 text-gray-600">
          <MapPin size={18} />
          <span>{employee.address}</span>
        </div>

        <div className="flex items-center gap-3 text-gray-600">
          <Briefcase size={18} />
          <span>{employee.designation}</span>
        </div>
      </div>
    </div>
  );
};

export default EmployeeCard;