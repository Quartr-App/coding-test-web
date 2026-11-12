export const checkPdf = async (url: string): Promise<boolean> => {
  try {
    const response = await fetch(url, { method: "HEAD" });

    const contentType = response.headers.get("content-type");

    return response.ok && contentType?.includes("application/pdf") === true;
  } catch (error) {
    console.error("Failed to check PDF:", error);
    return false;
  }
};
