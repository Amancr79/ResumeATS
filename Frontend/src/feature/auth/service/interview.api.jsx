import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000/api/interview/",
  withCredentials: true,
});

export async function getInterviewReport(
  jobDescription,
  selfDescription,
  resume,
) {
  const formData = new FormData();

  formData.append("jobDescription", String(jobDescription));
  formData.append("selfDescription", String(selfDescription));
  formData.append("resume", resume);
  formData.append("title", "SDE");

  console.log("jobDescription", jobDescription);
  console.log("selfDescription", selfDescription);
  console.log("resume", resume);
  try {
    const response = await api.post("/report", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    console.log(response);
    return response.data;
  } catch (err) {
    console.log(err);
    return null;
  }
}

export async function getInterviewReportById(userId) {
  try {
    console.log("usreID" , userId);
    const response = await api.get(`/report/${userId}`);
    return response.data;
  } catch (err) {
    console.log(err);
  }
}

export async function getAllInterviewReports() {
  try {
    const response = await api.get("/report");
    return response.data;
  } catch (err) {
    console.log(err);
  }
}
