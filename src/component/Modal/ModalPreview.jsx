import { useState, useEffect } from "react";
import axios from "axios";
import Select from "react-select";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { apiPostWithToken } from "../../Service/apiService";

function ModalPreview() {
  const [show, setShow] = useState(false);
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);
  const [selectedProvince, setSelectedProvince] = useState(null);
  const [selectedDistrict, setSelectedDistrict] = useState(null);
  const [selectedWard, setSelectedWard] = useState(null);
  const [phone, setPhone] = useState("");
  const [phoneError, setPhoneError] = useState("");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const API_URL_LOCAL = import.meta.env.VITE_API_URL_LOCAL;
  const token = localStorage.getItem("access_token");

  useEffect(() => {
    axios
      .get("https://provinces.open-api.vn/api/?depth=1")
      .then((response) => {
        const options = response.data.map((province) => ({
          value: province.code,
          label: province.name,
        }));
        setProvinces(options);
      })
      .catch((error) => console.error("Error fetching provinces:", error));
  }, []);

  const handleProvinceChange = (selectedOption) => {
    setSelectedProvince(selectedOption);
    setSelectedDistrict(null);
    setSelectedWard(null);
    axios
      .get(
        `https://provinces.open-api.vn/api/p/${selectedOption.value}?depth=2`
      )
      .then((response) => {
        const options = response.data.districts.map((district) => ({
          value: district.code,
          label: district.name,
        }));
        setDistricts(options);
      })
      .catch((error) => console.error("Error fetching districts:", error));
  };

  const handleDistrictChange = (selectedOption) => {
    setSelectedDistrict(selectedOption);
    setSelectedWard(null);
    axios
      .get(
        `https://provinces.open-api.vn/api/d/${selectedOption.value}?depth=2`
      )
      .then((response) => {
        const options = response.data.wards.map((ward) => ({
          value: ward.code,
          label: ward.name,
        }));
        setWards(options);
      })
      .catch((error) => console.error("Error fetching wards:", error));
  };

  const handlePhoneChange = (e) => {
    const value = e.target.value;
    setPhone(value);

    if (!/^\d{10}$/.test(value)) {
      setPhoneError("Phone number must be 10 digits.");
    } else {
      setPhoneError("");
    }
  };

  const handleSave = async () => {
    if (!phone || phoneError) {
      alert("Please enter a valid phone number.");
      return;
    }

    if (!selectedProvince || !selectedDistrict || !selectedWard) {
      alert("Please select a valid address.");
      return;
    }

    const requestData = {
      phone: phone,
      provice: selectedProvince.label,
      district: selectedDistrict.label,
      ward: selectedWard.label,
      address_detail: document.getElementById("addressDetails").value,
    };

    const response = await apiPostWithToken(
      `/address`,
      requestData,
      token
    );
    if (response.success) {
      handleClose();
    } else {
      console.log(response.data);
    }
  };

  return (
    <>
      <Button variant="warning" onClick={handleShow}>
        Add a new address
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add a new address</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="phone">
              <Form.Label>Phone</Form.Label>
              <Form.Control
                type="tel"
                placeholder="Phone number"
                value={phone}
                onChange={handlePhoneChange}
                isInvalid={!!phoneError}
                style={{ fontSize: "1.2rem", padding: "10px" }}
              />
              <Form.Control.Feedback type="invalid">
                {phoneError}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="province">
              <Form.Label>Province</Form.Label>
              <Select
                options={provinces}
                placeholder="Select province..."
                onChange={handleProvinceChange}
                value={selectedProvince}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="district">
              <Form.Label>District</Form.Label>
              <Select
                options={districts}
                placeholder="Select district..."
                onChange={handleDistrictChange}
                value={selectedDistrict}
                isDisabled={!selectedProvince}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="ward">
              <Form.Label>Ward</Form.Label>
              <Select
                options={wards}
                placeholder="Select ward..."
                onChange={setSelectedWard}
                value={selectedWard}
                isDisabled={!selectedDistrict}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="addressDetails">
              <Form.Label>Address details</Form.Label>
              <Form.Control as="textarea" rows={3} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSave}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalPreview;
