import * as yup from "yup";

const AddSkillSchema = yup.object().shape({
	parent_skill_pid: yup.string().required("Skillset is required"),
	skill_name: yup.string().required("Skill name is required"),
	skill_desc: yup.string().required("Skill description is required"),
});

export default AddSkillSchema;
