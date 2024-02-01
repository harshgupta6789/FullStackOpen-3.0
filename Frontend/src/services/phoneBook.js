import axios from "axios";

const url = "/api/persons";

const getAll = () => {
  const request = axios.get(url);
  return request.then((response) => response.data);
};

const addNew = (phone) => {
  const request = axios.post(url, phone);
  return request.then((response) => response.data);
};

const deletePhone = (id) => {
  const request = axios.delete(`${url}/${id}`);
  return request.then((response) => {
    console.log("inside phoneBook Service", response);
    response.data;
  });
};

const updatePhone = (person) => {
  const request = axios.put(`${url}/${person.id}`, person);
  return request.then((response) => response.data);
};

export default {
  getAll: getAll,
  addNew: addNew,
  deletePhone: deletePhone,
  updatePhone: updatePhone,
};
