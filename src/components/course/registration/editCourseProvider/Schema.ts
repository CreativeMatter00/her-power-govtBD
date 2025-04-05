import * as Yup from 'yup';

export const schema = Yup.object().shape({
  providor_name: Yup.string().required('Provider name is required'),
  trade_licence: Yup.string().notRequired(),
  vat_reg_id: Yup.string().notRequired(),
  tax_reg_id: Yup.string().notRequired(),
  tin_number: Yup.string().notRequired(),
  website_address: Yup.string().required('Website address is required'),
  address_line: Yup.string().required('Address is required'),
  hasBranches: Yup.boolean(),
  education_info: Yup.array().of(
    Yup.object().shape({
      educatmap_pid: Yup.string().nullable(),
      degree: Yup.string().required('Degree is required'),
      group: Yup.string().required('Group/Department is required'),
      passing_year: Yup.string().required('Passing year is required'),
      result: Yup.string().required('GPA result is required').test(
        'result-leq-outof',
        'GPA result cannot be greater than the out of value',
        function(value) {
          const { gpa_cgpa_outof } = this.parent; 
          return parseFloat(value) <= parseFloat(gpa_cgpa_outof);
        }
      ),
      gpa_cgpa_outof: Yup.string().required('GPA/CGPA out of is required'),
    })
  ),
  experience: Yup.array().of(
    Yup.object().shape({
      expcatmap_pid: Yup.string().nullable(),
      work_as: Yup.string().required('Work position is required'),
      experience: Yup.string().required('Experience description is required'),
      institution: Yup.string().required('Institution name is required'),
      relavent_dgree: Yup.string().required('Relevant degree is required')
    })
  ),
  branch: Yup.array().of(
    Yup.object().shape({
      branch_pid: Yup.string().nullable(),
      branch_name: Yup.string().nullable(),
      address_line: Yup.string().nullable(),
      website_address: Yup.string().nonNullable(),
      remarks: Yup.string().nullable(),
    })
  ),
});
