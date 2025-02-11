const generateUniqueId = () => {
  let id = null;

  if (typeof window !== "undefined" && window.localStorage) {
    id = localStorage.getItem("userUniqueId");

    if (!id) {
      const timestamp = new Date().getTime();
      const uniqueId = Math.random().toString(36).substring(2, 15);
      id = `id_${timestamp}_${uniqueId}`;
      localStorage.setItem("userUniqueId", id);
    }
    return id;
  }

  return "default-id";
};

export default generateUniqueId;
