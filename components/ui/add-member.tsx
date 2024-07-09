import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

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
  width: 500px; /* added width */
  height: auto;
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
  justify-content: space-between; /* Align buttons to the right */
  align-items: center; /* Align items vertically */
`;

const AddButton = styled.button`
  background-color: #016064;
  color: #fff;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

const NameList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  color: #000;
`;

const RemoveButton = styled.button`
  background-color: transparent;
  color: #000;
  padding: 5px 10px;
  width: 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  opacity: 0; /* initially hide the remove button */
  transition: opacity 0.3s ease; /* smooth transition on opacity change */
`;

const ListItem = styled.li`
  position: relative;
  padding-right: 40px; /* space for the remove button */

  &:hover ${RemoveButton} {
    opacity: 1; /* show the remove button on hover */
  }
`;

const ActionButton = styled.button`
  background-color: #016064;
  color: #fff;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

const AddMembers: React.FC<AddMembersProps> = ({ onClose, members }) => {
  const [newMember, setNewMember] = useState('');
  const [listMembers, setListMembers] = useState<string[]>(members || []);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    setListMembers(members || []);
  }, [members]);

  const isValidEmail = (email: string): boolean => {
    // Basic email format validation
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return emailRegex.test(email);
  };

  const handleAddMember = () => {
    if (newMember.trim() === '') {
      setError('Email address is required.');
      return;
    }

    if (!isValidEmail(newMember.trim())) {
      setError('Please enter a valid email address.');
      return;
    }

    if (listMembers.includes(newMember.trim())) {
      setError('This member is already added.');
      return;
    }

    setListMembers([...listMembers, newMember.trim()]);
    setNewMember('');
    setError('');
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

  return (
    <Overlay onClick={handleOverlayClick}>
      <Popup>
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
          {error && <p style={{ color: 'red', marginTop: '5px' }}>{error}</p>}
        </InputContainer>
        <ButtonContainer>
          <AddButton onClick={handleAddMember}>Add Member</AddButton>
          {listMembers.length > 0 && <ActionButton>Confirm</ActionButton>}
        </ButtonContainer>
        {listMembers.length > 0 && (
          <>
            <Title>Member List</Title>
            <NameList>
              {listMembers.map((member, index) => (
                <ListItem key={index}>
                  {member}
                  <RemoveButton onClick={() => handleRemoveMember(index)}>x</RemoveButton>
                </ListItem>
              ))}
            </NameList>
          </>
        )}
      </Popup>
    </Overlay>
  );
};

export default AddMembers;
