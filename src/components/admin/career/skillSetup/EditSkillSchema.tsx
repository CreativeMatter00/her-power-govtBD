import * as yup from "yup";

const EditSkillSchema = yup.object().shape({
	skill_name: yup.string().required("Skill name is required"),
	skill_desc: yup.string().required("Skill description is required"),
});

export default EditSkillSchema;
