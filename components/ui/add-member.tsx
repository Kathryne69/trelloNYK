import React, { useState, useEffect } from "react";
import styled from "styled-components";

interface AddMembersProps {
  onClose: () => void;
  members: string[];
}

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Popup = styled.div`
  background-color: #fff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  width: ${props => props.hasMembers ? '600px' : '500px'};
  max-height: 80vh;
  overflow: auto;
  transition: width 1s ease, height 1s ease;
`;


const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const Title = styled.h2`
  font-weight: bold;
  color: #000;
  margin: 10px;
`;

const CloseButton = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
  font-size: 18px;
  padding: 10px;
  color: #000;
`;

const InputContainer = styled.div`
  margin-bottom: 20px;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  color: #000;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const AddButton = styled.button`
  background-color: #0369A1;
  color: #fff;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #014d4f;
  }
`;

const ConfirmButton = styled.button`
  background-color: #0369A1;
  color: #fff;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #014d4f;
  }
`;

const TableContainer = styled.div`
  height: 200px;
  overflow-y: auto;
  border-radius: 5px
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const Th = styled.th`
  background-color: #0369A1;
  font-weight: 500;
  padding: 8px;
  border-radius: 1px;
  width: 75%;
  text-align: center;
  position: sticky;
  top: 0;
  z-index: 1;
`;

const Td = styled.td`
  padding: 8px;
  text-align: center;
  border-bottom: 1px solid #ccc;
`;

const ListItem = styled.tr<{ isHighlighted?: boolean }>`
  font-size: 12px;
  color: #000;
  ${(props) =>
    props.isHighlighted &&
    `
    background-color: #f1f3f2;
  `}
`;

const RemoveButton = styled.button`
  background-color: transparent;
  color: #000;
  padding: 5px 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  opacity: 0;
  transition: opacity 0.3s ease;

  ${ListItem}:hover & {
    opacity: 1;
  }

  ${(props) =>
    props.isHighlighted &&
    `
    opacity: 1;
  `}

  &:hover {
    color: #ff0000;
  }
`;

const handleConfirmMember = async () => {
  try {
    const response = await fetch("/api/addMember", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: newMember.trim() }),
    });

    if (response.ok) {
      // Send invitation email using your chosen email service
      // Example using SendGrid (replace with your chosen provider)
      const sendEmailResponse = await fetch("/api/sendEmail", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: newMember.trim() }),
      });

      if (sendEmailResponse.ok) {
        console.log("Invitation email sent successfully.");
      } else {
        console.error("Failed to send invitation email.");
      }

      setListMembers([...listMembers, newMember.trim()]);
      setNewMember("");
      setError("");
    } else {
      console.error("Failed to save email to database.");
    }
  } catch (error) {
    console.error("Error:", error);
  }
};

const AddMembers: React.FC<AddMembersProps> = ({ onClose, members }) => {
  const [newMember, setNewMember] = useState("");
  const [listMembers, setListMembers] = useState<string[]>(members || []);
  const [error, setError] = useState<string>("");
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  useEffect(() => {
    setListMembers(members || []);
  }, [members]);

  const isValidEmail = (email: string): boolean => {
    // Basic email format validation
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return emailRegex.test(email);
  };

  const handleAddMember = () => {
    if (newMember.trim() === "") {
      setError("Email address is required.");
      return;
    }

    if (!isValidEmail(newMember.trim())) {
      setError("Please enter a valid email address.");
      return;
    }

    if (listMembers.includes(newMember.trim())) {
      setError("This member is already added.");
      return;
    }

    setListMembers([...listMembers, newMember.trim()]);
    setNewMember("");
    setError("");
  };

  const handleRemoveMember = (index: number) => {
    const updatedMembers = [...listMembers];
    updatedMembers.splice(index, 1);
    setListMembers(updatedMembers);
  };

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleMouseEnter = (index: number) => {
    setHoveredIndex(index);
  };

  const handleMouseLeave = () => {
    setHoveredIndex(null);
  };

  return (
    <Overlay onClick={handleOverlayClick}>
      <Popup hasMembers={listMembers.length > 0}>
        <Header>
          <Title>Add Members</Title>
          <CloseButton onClick={onClose}>x</CloseButton>
        </Header>
        <InputContainer>
          <Input
            type="text"
            value={newMember}
            onChange={(e) => setNewMember(e.target.value)}
            placeholder="Enter Email Address"
          />
          {error && <p style={{ color: "red", marginTop: "5px" }}>{error}</p>}
        </InputContainer>
        <ButtonContainer>
          <AddButton onClick={handleAddMember}>Add Member</AddButton>
          {listMembers.length > 0 && (
            <ConfirmButton onClick={handleConfirmMember}>Confirm</ConfirmButton>
          )}
        </ButtonContainer>
        {listMembers.length > 0 && (
          <>
            <Title>Member List</Title>
            <TableContainer>
              <Table>
                <thead>
                  <tr>
                    <Th>Email Address</Th>
                    <Th>Action</Th>
                  </tr>
                </thead>
                <tbody>
                  {listMembers.map((member, index) => (
                    <ListItem
                      key={index}
                      onMouseEnter={() => handleMouseEnter(index)}
                      onMouseLeave={handleMouseLeave}
                      isHighlighted={hoveredIndex === index}
                    >
                      <Td>{member}</Td>
                      <Td>
                        <RemoveButton onClick={() => handleRemoveMember(index)}>
                          Remove
                        </RemoveButton>
                      </Td>
                    </ListItem>
                  ))}
                </tbody>
              </Table>
            </TableContainer>
          </>
        )}
      </Popup>
    </Overlay>
  );
};

export default AddMembers;