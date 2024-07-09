import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { CardWithList } from "@/type";
import { Calendar, X } from 'lucide-react'; // Importing only necessary icons

interface AddtoCardProps {
    data: CardWithList;
}

export const AddtoCard = ({ 
    data,
}: AddtoCardProps) => {
    const [selectedColors, setSelectedColors] = useState<string[]>([]);
    const [showColorModal, setShowColorModal] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [newLabelTitle, setNewLabelTitle] = useState('');
    const [showNewLabelModal, setShowNewLabelModal] = useState(false);
    const [showMemberModal, setShowMemberModal] = useState(false);
    const [searchMemberTerm, setSearchMemberTerm] = useState('');
    const [showAttachmentModal, setShowAttachmentModal] = useState(false);
    const [attachmentLinks, setAttachmentLinks] = useState<string[]>([]);
    const [searchAttachmentTerm, setSearchAttachmentTerm] = useState('');
    const [displayText, setDisplayText] = useState('');
    const [showDateModal, setShowDateModal] = useState(false); // Added state for date modal
    const [selectedDate, setSelectedDate] = useState<string>('');
    const [selectedTime, setSelectedTime] = useState<string>(''); // Added state for time
    const [reminderOption, setReminderOption] = useState<string>('none'); // Added state for reminder option
    const [isDateSelected, setIsDateSelected] = useState<boolean>(false); // Added state to track date selection
    const [selectedDateType, setSelectedDateType] = useState<string>('start'); // Added state to track selected date type

    const handleLabelButtonClick = () => {
        setShowColorModal(true);
    };

    const handleColorSelect = (color: string) => {
        const index = selectedColors.indexOf(color);
        if (index === -1) {
            setSelectedColors([...selectedColors, color]);
        } else {
            setSelectedColors(selectedColors.filter((c) => c !== color));
        }
    };

    const filteredColors = [
        { color: '#00ff00', name: 'Green' },
        { color: '#87cefa', name: 'Light Sky Blue' },
        { color: '#add8e6', name: 'Light Blue' },
        { color: '#ff69b4', name: 'Hot Pink' },
        { color: '#ff4500', name: 'Orange Red' },
        { color: '#ffa500', name: 'Orange' },
        { color: '#ffd700', name: 'Gold' },
        { color: '#ffb6c1', name: 'Light Pink' },
        { color: '#00bfff', name: 'Deep Sky Blue' },
        { color: '#ff00ff', name: 'Fuchsia' },
        { color: '#800080', name: 'Purple' },
    ].filter(({ name }) => name.toLowerCase().includes(searchTerm.toLowerCase()));

    const handleNewLabelClick = () => {
        setShowNewLabelModal(true);
    };

    const handleCloseModal = () => {
        setShowColorModal(false);
    };

    const handleNewLabelModalClose = () => {
        setShowNewLabelModal(false);
        setNewLabelTitle('');
        setSelectedColors([]);
    };

    const handleNewLabelSubmit = () => {
        // Handle the action for creating a new label here
        console.log("New label title:", newLabelTitle);
        console.log("Selected colors:", selectedColors);
        handleNewLabelModalClose();
    };

    const handleMemberButtonClick = () => {
        setShowMemberModal(true);
    };

    const handleMemberSearchTermChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchMemberTerm(e.target.value);
    };

    const handleAttachmentButtonClick = () => {
        setShowAttachmentModal(true);
    };

    const handleChooseFile = () => {
        const fileInput = document.getElementById('fileInput') as HTMLInputElement | null;
        if (fileInput) {
            fileInput.click();
        }
    };

    const handleAddAttachmentLink = () => {
        // Logic to add attachment link
        console.log("Attachment link added:", attachmentLinks);
    };

    const handleAttachmentSearchTermChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchAttachmentTerm(e.target.value);
    };

    // Function to handle date button click
    const handleDateButtonClick = () => {
        setShowDateModal(true);
    };

    // Function to handle closing date modal
    const handleCloseDateModal = () => {
        setShowDateModal(false);
    };

    // Function to handle date selection
    const handleDateSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedDateValue = e.target.value;
        setSelectedDate(selectedDateValue);
    };

    // Function to handle time selection
    const handleTimeSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedTimeValue = e.target.value;
        setSelectedTime(selectedTimeValue);
    };

    // Function to handle reminder option select
    const handleReminderOptionSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setReminderOption(e.target.value);
    };

    // Function to handle saving the selected date
    const handleSaveDate = () => {
        // Logic to save the selected date
        console.log("Selected date type:", selectedDateType);
        console.log("Selected date:", selectedDate);
        console.log("Selected time:", selectedTime); // Log selected time
        console.log("Reminder option:", reminderOption);
        handleCloseDateModal();
    };

    // Function to handle removing the selected date
    const handleRemoveDate = () => {
        // Logic to remove the selected date
        setSelectedDate('');
        setSelectedTime(''); // Reset selected time
        setReminderOption('none');
        setIsDateSelected(false); // Update the state to indicate that no date is selected
        handleCloseDateModal();
    };

    // Function to handle checkbox change
    const handleCheckboxChange = (type: string) => {
        setIsDateSelected(true);
        setSelectedDateType(type);
    };

    return (
        <div className="space-y-2 mt-2">
            <p className="text-xs font-semibold mb-1">
                Add to card
            </p>
            <Button
                variant="gray"
                className="w-full justify-start"
                size="inline"
                onClick={handleAttachmentButtonClick}
            >
                Attachment
            </Button>
            <Button
                variant="gray"
                className="w-full justify-start"
                size="inline"
                onClick={handleLabelButtonClick}
            >
                Labels
            </Button>
            <Button
                variant="gray"
                className="w-full justify-start"
                size="inline"
                onClick={handleMemberButtonClick}
            >
                Members
            </Button>
            <Button
                variant="gray"
                className="w-full justify-start"
                size="inline"
                onClick={handleDateButtonClick} // Add onClick handler for date button
            >
                Dates
            </Button>

            {/* Render date modal if showDateModal is true */}
            {showDateModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center z-0 items-center">
                    <div className="bg-white p-[50px] max-w-md rounded-lg relative">
                        <button 
                            className="absolute top-2 right-2 text-gray-600"
                            onClick={handleCloseDateModal} // Close modal on button click
                        >
                            <X size={24} />
                        </button>
                        <p className="text-lg font-semibold mb-4 text-center">Select a Date:</p>
                        <input 
                            type="date" 
                            value={selectedDate} 
                            onChange={handleDateSelect} 
                            className="w-full px-2 py-1 mb-2 border border-gray-300 rounded"
                        />

                        {/* Checkbox to display selected date */}
                        <div className="mb-2">
                            <label className="flex items-center">
                                <input
                                    type="checkbox"
                                    checked={selectedDateType === 'start'}
                                    className="mr-2"
                                    onChange={() => handleCheckboxChange('start')}
                                />
                                <span className="selected-date-label">Start Date</span>
                            </label>
                            {selectedDateType === 'start' && isDateSelected && (
                                <div className="ml-5">
                                    <span className="selected-date">{selectedDate}</span>
                                </div>
                            )}
                            <label className="flex items-center">
                                <input
                                    type="checkbox"
                                    checked={selectedDateType === 'due'}
                                    className="mr-2"
                                    onChange={() => handleCheckboxChange('due')}
                                />
                                <span className="selected-date-label">Due Date</span>
                            </label>
                            {selectedDateType === 'due' && isDateSelected && (
                                <div className="ml-5 mb-2">
                                    <span className="selected-date">{selectedDate}</span>
                                </div>
                            )}

                            {/* Add input field for time selection */}
                        <input 
                            type="time" 
                            value={selectedTime} 
                            onChange={handleTimeSelect} 
                            className="w-full px-2 py-1 mb-2 border border-gray-300 rounded"
                        />
                        </div>
                        {/* Select for reminder options */}
                        <p>Set due date reminder</p>
                        <select
                            value={reminderOption}
                            onChange={handleReminderOptionSelect}
                            className="w-full px-2 py-1 mb-2 border border-gray-300 rounded"
                        >
                            <option value="1_day_before">1 day before</option>
                            <option value="none">None</option>
                            <option value="At time of due date">At time of due date</option>
                            <option value="5_minutes_before">5 minutes before</option>
                            <option value="10_minutes_before">10 minutes before</option>
                        </select>
                        {/* Save and Remove buttons */}
                        <div className="flex justify-end mt-4">
                            <Button
                                variant="primary"
                                className="mr-2"
                                onClick={handleSaveDate}
                            >
                                Save
                            </Button>
                            <Button
                                variant="gray"
                                onClick={handleRemoveDate}
                            >
                                Remove
                            </Button>
                        </div>
                    </div>
                </div>
            )}

            {/* Render color modal */}
            {showColorModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center z-0 items-center w-50">
                    <div className="bg-white p-[50px] rounded-lg max-h-64 overflow-y-auto relative">
                        <button 
                            className="absolute top-2 right-2 text-gray-600"
                            onClick={handleCloseModal}
                        >
                            <X size={24} />
                        </button>
                        <p className="font-semibold mb-2 text-center">Labels</p>
                        <input
                            type="text"
                            placeholder="Search labels"
                            className="w-full px-2 py-1 mb-2 border border-gray-300 rounded"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <p className="text-xs font-semibold mb-3">Labels</p>
                        <div className="flex flex-col space-y-3">
                            {filteredColors.map(({ color }) => (
                                <label key={color} className="flex items-center">
                                    <input
                                        type="checkbox"
                                        value={color}
                                        className="mr-2"
                                        onChange={() => handleColorSelect(color)}
                                    />
                                    <div className="w-60 h-8 bg-gray-200 border border-gray-300 mr-2" style={{ backgroundColor: color }} />
                                </label>
                            ))}
                        </div>
                        <p className="text-xs font-semibold"></p>
                        <Button
                            variant="primary"
                            className="w-full mt-4"
                            onClick={handleNewLabelClick}
                        >
                            Create New Label
                        </Button>
                    </div>
                </div>
            )}

            {/* Render member modal */}
            {showMemberModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center z-0 items-center w-50">
                    <div className="bg-white p-[50px] rounded-lg max-h-64 overflow-y-auto relative">
                        <button 
                            className="absolute top-2 right-2 text-gray-600"
                            onClick={() => setShowMemberModal(false)}
                        >
                            <X size={24} />
                        </button>
                        <p className="font-semibold mb-2 text-center">Members</p>
                        <input
                            type="text"
                            placeholder="Search members"
                            className="w-full px-2 py-1 mb-5 border border-gray-300 rounded"
                            value={searchMemberTerm}
                            onChange={handleMemberSearchTermChange}
                        />
                        Card Members
                    </div>
                </div>
            )}

            {/* Render New Label modal */}
            {showNewLabelModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center z-0 items-center">
                    <div className="bg-white p-8 rounded-lg max-w-md">
                        <h2 className="text-lg font-semibold mb-4">New Label</h2>
                        <input
                            type="text"
                            placeholder="Enter label title"
                            className="w-full px-2 py-1 mb-4 border border-gray-300 rounded"
                            value={newLabelTitle}
                            onChange={(e) => setNewLabelTitle(e.target.value)}
                        />
                        <p className="text-xs font-semibold mb-1">Select a color:</p>
                        <div className="flex flex-wrap -mx-1 mt-1">
                            {filteredColors.map(({ color }) => (
                                <label key={color} className="flex items-center mx-1 mb-1">
                                    <input
                                        type="checkbox"
                                        value={color}
                                        className="mr-2"
                                        onChange={() => handleColorSelect(color)}
                                    />
                                    <div className="w-12 h-8 bg-gray-200 border border-gray-300 mr-2" style={{ backgroundColor: color }} />
                                </label>
                            ))}
                        </div>
                        <div className="flex justify-end mt-4">
                            <Button
                                variant="primary"
                                className="mr-2"
                                onClick={handleNewLabelSubmit}
                            >
                                Create
                            </Button>
                            <Button
                                variant="gray"
                                onClick={handleNewLabelModalClose}
                            >
                                Cancel
                            </Button>
                        </div>
                    </div>
                </div>
            )}

            {/* Render attachment modal */}
            {showAttachmentModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center z-0 items-center w-50">
                    <div className="bg-white p-[50px] rounded-lg max-w-md max-h-64 overflow-y-auto relative">
                        <button 
                            className="absolute top-2 right-2 text-gray-600"
                            onClick={() => setShowAttachmentModal(false)}
                        >
                            <X size={24} />
                        </button>
                        <p className="font-semibold mb-4 text-center">Attach</p>
                        <Button
                            variant="primary"
                            className="w-full mb-6"
                            onClick={handleChooseFile}
                        >
                            Choose a File
                        </Button>
                        {/* Invisible file input */}
                        <input
                            id="fileInput"
                            type="file"
                            style={{ display: 'none' }}
                            onChange={(e) => {
                                // Logic to handle the selected file
                                const file = e.target.files && e.target.files[0];
                                if (file) {
                                    console.log("Selected file:", file);
                                    // Do something with the selected file
                                }
                            }}
                        />
                        Search or paste a link
                        <input
                            type="text"
                            placeholder="Search or paste a links"
                            className="w-full px-2 py-1 mb-2 border border-gray-300 rounded"
                            value={searchAttachmentTerm}
                            onChange={handleAttachmentSearchTermChange}
                        />
                        Display text (optional)
                        <input
                            type="text"
                            placeholder="Text to Display"
                            className="w-full px-2 py-1 mb-2 border border-gray-300 rounded"
                            value={displayText}
                            onChange={(e) => setDisplayText(e.target.value)}
                        />
                        <div className="flex justify-end mt-4">
                            <Button
                                variant="primary"
                                className="mr-2"
                                onClick={handleAddAttachmentLink}
                            >
                                Insert
                            </Button>
                            <Button
                                variant="gray"
                                onClick={() => setShowAttachmentModal(false)}
                            >
                                Cancel
                            </Button>
                        </div>
                    </div>
                </div>
            )}

            {/* Skeleton for loading state */}
            <div className="space-y-2 mt-2">
            </div>
        </div>
    );
};

// Skeleton component for loading state
AddtoCard.Skeleton = function AddtoCardSkeleton () {
    return (
        <div className="space-y-2 mt-2">
            <Skeleton className="w-20 h-12 bg-neutral-200" />
            <Skeleton className="w-20 h-12 bg-neutral-200" />  
            <Skeleton className="w-full h-8 bg-neutral-200" />
        </div>
    )
};
