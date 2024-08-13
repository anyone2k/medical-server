exports.getDataByUser = (hospitals, userId) => {
  const matchingDepartmentsHospitals = [];

  hospitals.forEach((hospital) => {
    hospital.departments.forEach((department) => {
      if (department.staff.includes(userId)) {
        if (!matchingDepartmentsHospitals.includes(hospital)) {
          delete hospital.departments;
          matchingDepartmentsHospitals.push(hospital);
        }
      }
    });
  });
  return matchingDepartmentsHospitals;
};
