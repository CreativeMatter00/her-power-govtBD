import * as yup from "yup";

const SkillsetSchema = yup.object().shape({
	skill_name: yup.string().required("Skill name is required"),
	skill_desc: yup.string().required("Skill description is required"),
});

export default SkillsetSchema;
