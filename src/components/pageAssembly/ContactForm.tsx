"use client";

import React, { useState, useEffect } from "react";
import { ChevronUpDownIcon } from "@heroicons/react/16/solid";
import { CheckIcon } from "@heroicons/react/20/solid";
import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react";

const reason = [
  { id: 1, name: "Question About Art" },
  { id: 2, name: "General Inquiry" },
  { id: 3, name: "Problem with Order" },
  { id: 4, name: "Group Art Show" },
  { id: 5, name: "Commissioned Art" },
];

export default function ContactForm() {
  const [selected, setSelected] = useState(reason[1]);

  return (
    <div className="flex flex-col items-center justify-center mt-[30px]">
      <div
        id="contactForm"
        className="flex flex-col w-full h-full bg-white rounded-md mobile:rounded-none max-w-[820px] mb-[60px] p-6"
      >
        <div
          id="banner"
          className="flex items-center justify-center h-[210px] bg-[#D9D9D9] rounded-t-md mobile:rounded-none"
        ></div>
        <div id="requiredFieldsLockup" className="flex">
          <div
            id="requiredFields"
            className="font-sans text-[9pt] font-medium text-[#ff0000] mt-[5px]"
          >
            *
          </div>
          <div
            id="requiredFields"
            className="ml-[2px] font-sans text-[9pt] font-medium text-[#333] mt-[5px]"
          >
            Required fields
          </div>
        </div>

        <div id="nameFields" className="flex w-full my-[10px]">
          <div id="firstName" className="flex flex-col w-full mr-[20px]">
            <div id="firstNameLockup" className="flex">
              <div
                id="firstNameLabel"
                className="font-sans text-[10pt] font-bold text-[#333] mt-[5px]"
              >
                First Name
              </div>
              <div
                id="firstNameAsterisk"
                className="ml-[2px] font-sans text-[10pt] font-bold text-[#ff0000] mt-[5px]"
              >
                *
              </div>
            </div>

            <div
              id="firstNameInput"
              className="flex h-[35px] w-full mt-[5px] rounded-md outline outline-2 -outline-offset-1 outline-gray-300 items-center"
            >
              <input
                className="w-full text-[#1f1f1f] font-[0.9em] font-medium p-[0.5em] h-[35px] focus:outline-none"
                type="text"
                id="firstName"
                required
              />
            </div>
          </div>
          <div id="lastName" className="flex flex-col w-full">
            <div id="lastNameLockup" className="flex">
              <div
                id="lastNameLabel"
                className="font-sans text-[10pt] font-bold text-[#333] mt-[5px]"
              >
                Last Name
              </div>
              <div
                id="lastNameAsterisk"
                className="ml-[2px] font-sans text-[10pt] font-bold text-[#ff0000] mt-[5px]"
              >
                *
              </div>
            </div>

            <div
              id="lastNameInput"
              className="h-[35px] mt-[5px] rounded-md outline outline-2 -outline-offset-1 outline-gray-300"
            >
              <input
                className="w-full text-[#1f1f1f] font-[0.9em] font-medium p-[0.5em] h-[35px] focus:outline-none"
                type="text"
                id="lastName"
                required
              />
            </div>
          </div>
        </div>
        <div id="emailField" className="flex flex-col w-full mb-[10px]">
          <div id="emailLockup" className="flex">
            <div
              id="emailLabel"
              className="font-sans text-[10pt] font-bold text-[#333] mt-[5px]"
            >
              Email
            </div>
            <div
              id="emailAsterisk"
              className="ml-[2px] font-sans text-[10pt] font-bold text-[#ff0000] mt-[5px]"
            >
              *
            </div>
          </div>
          <div
            id="emailInput"
            className="h-[35px] w-full mt-[5px] rounded-md outline outline-2 -outline-offset-1 outline-gray-300 items-center"
          >
            <input
              className="w-full text-[#1f1f1f] font-[0.9em] font-medium p-[0.5em] h-[35px] focus:outline-none"
              type="text"
              id="email"
              required
            />
          </div>
        </div>
        <div
          id="reasonForContactDropdown"
          className="flex flex-col w-full mb-[10px]"
        >
          <div id="reasonForContactLockup" className="flex">
            <div
              id="reasonForContactLabel"
              className="font-sans text-[10pt] font-bold text-[#333] mt-[5px]"
            >
              Reason for Contact
            </div>
            <div
              id="reasonForContactAsterisk"
              className="ml-[2px] font-sans text-[10pt] font-bold text-[#ff0000] mt-[5px]"
            >
              *
            </div>
          </div>

          <div
            id="reasonForContactInput"
            className="w-full rounded-sm mt-[5px] relative"
          >
            <Listbox value={selected} onChange={setSelected}>
              <ListboxButton className="grid w-full cursor-default grid-cols-1 rounded-md bg-white py-1.5 pl-3 pr-2 text-left text-gray-900 outline outline-2 -outline-offset-1 outline-gray-300 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-[11pt]">
                <span className="col-start-1 row-start-1 truncate pr-6 text-[11pt]">
                  {selected.name}
                </span>
                <ChevronUpDownIcon
                  aria-hidden="true"
                  className="col-start-1 row-start-1 size-5 self-center justify-self-end text-gray-500 sm:size-4"
                />
              </ListboxButton>

              <ListboxOptions
                transition
                className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-[11pt] shadow-lg ring-1 ring-black/5 focus:outline-none data-[closed]:data-[leave]:opacity-0 data-[leave]:transition data-[leave]:duration-100 data-[leave]:ease-in sm:text-[11pt]"
              >
                {reason.map((reason) => (
                  <ListboxOption
                    key={reason.id}
                    value={reason}
                    className="group relative cursor-default select-none py-2 pl-8 pr-4 text-gray-900 data-[focus]:bg-indigo-600 data-[focus]:text-white data-[focus]:outline-none"
                  >
                    <span className="block truncate font-sans font-normal group-data-[selected]:font-semibold">
                      {reason.name}
                    </span>

                    <span className="absolute inset-y-0 left-0 flex items-center pl-1.5 text-indigo-600 group-[&:not([data-selected])]:hidden group-data-[focus]:text-white">
                      <CheckIcon aria-hidden="true" className="size-5" />
                    </span>
                  </ListboxOption>
                ))}
              </ListboxOptions>
            </Listbox>
          </div>
        </div>
        <div id="messageField" className="flex flex-col w-full mb-[30px]">
          <div id="yourMessageLockup" className="flex">
            <div
              id="yourMessageLabel"
              className="font-sans text-[10pt] font-bold text-[#333] mt-[5px]"
            >
              Your message
            </div>
            <div
              id="yourMessageAsterisk"
              className="ml-[2px] font-sans text-[10pt] font-bold text-[#ff0000] mt-[5px]"
            >
              *
            </div>
          </div>

          <div
            id="clarityLabel"
            className="font-sans text-[8pt] font-normal text-[#a9a9a9] "
          >
            Please provide as many details that you can about your inquiry to
            help me respond as quickly as possible. 5000 characters max.
          </div>
          <div
            id="messageInput"
            className="h-[350px] w-full mt-[5px] rounded-md outline outline-2 -outline-offset-1 outline-gray-300"
          >
            <textarea
              className="w-full h-full text-[#1f1f1f] font-[0.9em] font-medium p-[0.8em] border-2 outline-none border-solid resize-none focus:outline-none"
              maxLength={5000}
              placeholder="Enter your message here"
              required
              id="message"
            ></textarea>
          </div>
        </div>
        <div id="fileUpload" className="flex flex-col w-full mb-[10px]">
          <div
            id="fileUploadLabel"
            className="font-sans text-[10pt] font-bold text-[#333] mt-[5px]"
          >
            File upload
          </div>
          <div
            id="fileUploadInfo"
            className="w-full font-sans text-[8pt] font-normal text-[#a4a4a4]"
          >
            If your question could be understood better by showing me a
            screenshot, please add it to the form. Only jpg, pdf and png formats
            can be uploaded. Thanks!
          </div>
          <div
            id="chooseFileButton"
            className="flex w-[110px] h-[40px] font-sans text-[10pt] font-bold text-[#333] mt-[10px] bg-[#e4e4e4] hover:bg-[#000] cursor-pointer items-center justify-center text-[#a4a4a4]"
          >
            Choose File
          </div>
          <div
            id="submitButtom"
            className="flex w-full justify-center mt-[30px]"
          >
            <button
              type="submit"
              className="flex w-[110px] h-[35px] flex-1 items-center justify-center rounded-md bg-indigo-600 text-[11pt] outline outline-1 outline-indigo-700 font-md text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50 sm:w-full select-none"
            >
              Send Message
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
