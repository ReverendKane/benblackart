import { forwardRef } from "react";

const FormItem = forwardRef((props: any, ref: any) => {
  switch (props.inputType) {
    case "lineInput":
      return (
        <div className="flex flex-col font-Montserrat mobile:mt-0">
          <label className="mb-[5px]" htmlFor={props.id}>
            {props.labelText}
          </label>
          <input
            className="text-[#1f1f1f] font-[0.9em] font-medium p-[0.8em] outline-none border-2 border-solid rounded-[4px]
            laptop:h-7 laptop:p-[0.5em] laptop:text-[10px]
            desktop:h-8 desktop:p-[0.6em]
            hd:p-[0.8em]"
            type="text"
            id={props.id}
            name={props.id}
            placeholder={props.placeHolder}
            onChange={props.onChange}
            ref={ref}
            value={props.value}
            required
          />
        </div>
      );
    case "emailInput":
      return (
        <div className="flex flex-col font-Montserrat mobile:mt-0 ">
          <label className="mb-[5px]" htmlFor={props.id}>
            {props.labelText}
          </label>
          <input
            className="text-[#1f1f1f] font-[0.9em] font-medium p-[0.8em] outline-none border-2 border-solid rounded-[4px]
            laptop:h-7 laptop:p-[0.5em] laptop:text-[10px]
            desktop:h-8 desktop:p-[0.6em]
            hd:p-[0.8em]"
            type="email"
            id={props.id}
            name={props.id}
            placeholder={props.placeHolder}
            ref={ref}
            value={props.value}
            onChange={props.onChange}
            required
          />
        </div>
      );
    case "dropdown":
      return (
        <div className="flex flex-col font-Montserrat tracking-wider mobile:mt-0">
          <label className="mb-[5px]" htmlFor={props.id}>
            {props.labelText}
          </label>
          <select
            className="text-[#1f1f1f] font-[0.9em] tracking-wider p-[0.8em] border-2 outline-none border-solid rounded-[4px]
            laptop:h-7 laptop:p-[0.5em] laptop:text-[10px]
            desktop:h-8 desktop:p-[0.6em]
            hd:p-[0.8em]"
            required
            id={props.id}
            onChange={props.onChange}
            ref={ref}
            value={props.value}
          >
            <option value="0" disabled>
              Select reason for contact
            </option>
            <option value="1">Question about website</option>
            <option value="2">Work availability</option>
            <option value="3">Art Inquiry</option>
            <option value="4">Add me to your mailing list</option>
          </select>
        </div>
      );
    case "textInput":
      return (
        <div className="flex flex-col font-Montserrat mobile:mt-0">
          <label className="mb-[5px]" htmlFor={props.id}>
            {props.labelText}
          </label>
          <textarea
            className="text-[#1f1f1f] font-[0.9em] font-medium p-[0.8em] border-2 outline-none border-solid rounded-[4px] resize-none
            tablet:min-h-[60px]
            laptop:min-h-[200px]
            desktop:min-h-[200px]
            hd:min-h-[300px]"
            maxLength={5000}
            placeholder="Enter your message here"
            ref={ref}
            value={props.value}
            onChange={props.onChange}
            required
            id={props.id}
          ></textarea>
          <span className="pt-[10px] text-[#1f1f1f] font[0.9em] hidden"></span>
        </div>
      );
    default:
      return <div />;
  }
});

FormItem.displayName = "FormItem";

export default FormItem;
