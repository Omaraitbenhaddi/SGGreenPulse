import { runPlaybook } from "src/api/playbook";

export const submitForm = async (values, title, domainKey, setError) => {
  try {
    const result = await runPlaybook(title, Object.entries(values).map(([name, value]) => ({ name, value })), domainKey, "");
    return result;
  } catch (error) {
    console.log("Error submitting form:", error.message);
    setError(error.message);
    throw new Error(error.message);
  }
};
