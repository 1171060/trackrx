import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  addRecordToIndexedDB,
  updateRecordInIndexedDB,
  getRecordById,
} from "../components/database/indexedDBUtils";

function MedForm() {
  const { medId } = useParams();
  const navigate = useNavigate();

  // Define state variables for form fields
  const [medData, setMedData] = useState({
    medName: "",
    startDate: "",
    endDate: "",
    dosage: "",
    frequency: "",
    instructions: "",
    reactions: "",
    notes: "",
    groupTrack: "",
  });

  const [errors, setErrors] = useState({});

  // Define groupTasks here or import it from an external source
  const groupTasks = [
    { id: "default", name: "General" },
    // Add other options as needed
  ];

  useEffect(() => {
    const fetchMedicationData = async () => {
      if (medId) {
        // Fetch the existing medication data for editing
        try {
          const specificMedData = await getRecordById(
            "HealthDatabase",
            "Meds",
            parseInt(medId, 10)
          );

          if (specificMedData) {
            // Populate form fields with existing data
            setMedData(specificMedData);
          } else {
            console.log("No data found for ID:", medId);
          }
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      }
    };

    fetchMedicationData();
  }, [medId]);

  const clearForm = () => {
    // Reset all form fields
    setMedData({
      medName: "",
      startDate: "",
      endDate: "",
      dosage: "",
      frequency: "",
      instructions: "",
      reactions: "",
      notes: "",
      groupTrack: "",
    });
  };

  const validateForm = () => {
    let formIsValid = true;
    let errors = {};

    // Validate form fields
    if (!medData.medName) {
      formIsValid = false;
      errors["medName"] = "Medication name is required.";
    }

    if (!medData.startDate) {
      formIsValid = false;
      errors["startDate"] = "Start date is required.";
    }

    if (!medData.dosage) {
      formIsValid = false;
      errors["dosage"] = "Dosage is required.";
    }

    if (!medData.frequency) {
      formIsValid = false;
      errors["frequency"] = "Frequency is required.";
    }

    setErrors(errors);
    return formIsValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      console.error("Validation failed");
      return;
    }

    try {
      if (medId) {
        // Update existing record
        await updateRecordInIndexedDB("HealthDatabase", "Meds", medData);
        console.log("Record updated successfully");
      } else {
        // Add new record
        await addRecordToIndexedDB("HealthDatabase", "Meds", medData);
        console.log("Record added successfully");
      }
      navigate("/meds");
    } catch (error) {
      console.error("Error saving data:", error);
    }
  };

  // Function to navigate back to the "meds" page
  const handleCancel = () => {
    navigate("/meds");
  };

  const isNewRecord = !medId;

  return (
    <div className="med-form">
      <form onSubmit={handleSubmit} className="med-form">
        <div className="row">
          <label>Medication Name:</label>
          <input
            type="text"
            value={medData.medName}
            onChange={(e) =>
              setMedData({ ...medData, medName: e.target.value })
            }
            required
          />
          {errors.medName && <p className="error">{errors.medName}</p>}
        </div>

        <div className="row">
          <div className="date-input">
            <label>Start Date:</label>
            <input
              type="date"
              value={medData.startDate}
              onChange={(e) =>
                setMedData({ ...medData, startDate: e.target.value })
              }
              required
            />
            {errors.startDate && <p className="error">{errors.startDate}</p>}
          </div>
          <div className="date-input">
            <label>End Date:</label>
            <input
              type="date"
              value={medData.endDate}
              onChange={(e) =>
                setMedData({ ...medData, endDate: e.target.value })
              }
            />
          </div>
        </div>

        <div className="row">
          <div className="half-width">
            <label>Dosage: </label>
            <input
              type="text"
              value={medData.dosage}
              onChange={(e) =>
                setMedData({ ...medData, dosage: e.target.value })
              }
              required
            />
            {errors.dosage && <p className="error">{errors.dosage}</p>}
          </div>
          <div className="half-width">
            <label>Frequency:</label>
            <input
              type="text"
              value={medData.frequency}
              onChange={(e) =>
                setMedData({ ...medData, frequency: e.target.value })
              }
              required
            />
            {errors.frequency && <p className="error">{errors.frequency}</p>}
          </div>
        </div>

        <div className="row">
          <label>Instructions:</label>
          <textarea
            value={medData.instructions}
            onChange={(e) =>
              setMedData({ ...medData, instructions: e.target.value })
            }
            required
          ></textarea>
          {errors.instructions && (
            <p className="error">{errors.instructions}</p>
          )}
        </div>

        <div className="row">
          <label>My Reactions To Med:</label>
          <textarea
            value={medData.reactions}
            onChange={(e) =>
              setMedData({ ...medData, reactions: e.target.value })
            }
          ></textarea>
        </div>

        <div className="row">
          <label>Notes About Med:</label>
          <textarea
            value={medData.notes}
            onChange={(e) => setMedData({ ...medData, notes: e.target.value })}
          ></textarea>
        </div>

        <div className="row">
          <div className="select-container">
            <label>Select a Group/Track: &nbsp;</label>
            <select
              value={medData.groupTrack}
              onChange={(e) =>
                setMedData({ ...medData, groupTrack: e.target.value })
              }
            >
              <option value="">Select a Group/Track</option>
              {groupTasks.map((task) => (
                <option key={task.id} value={task.id}>
                  {task.name}
                </option>
              ))}
            </select>
          </div>
          <div className="submit-container">
            <button type="button" onClick={handleCancel}>
              Cancel
            </button>
            <button type="submit">Submit</button>
          </div>
        </div>
      </form>
    </div>
  );
}
export default MedForm;
