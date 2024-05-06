
import { Note } from "@/types/index";
import { Disclosure } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import ContentNote from "./ContentNote";

type AcordionProps = {
  notes: Note[];
};

const AcordionNotes = ({ notes }: AcordionProps) => {

  return (
    <div className="w-full mt-2">
      <div className=" w-full rounded-2xl">
        <Disclosure>
          {({ open }) => (
            <>
              <Disclosure.Button className="flex focus:outline-none border pl-4 w-full justify-between rounded-lg bg-white py-3 text-left text-sm font-medium text-black">
                <span>Notas de los colaboradores</span>
                <ChevronDownIcon
                  className={`${
                    open ? "rotate-180 transform" : ""
                  } h-[17px] w-[17px]`}
                />
              </Disclosure.Button>
              <Disclosure.Panel className="px-4 pb-2 pt-2 space-y-7 text-sm text-gray-500">
                {notes.map((note) => (
                 <ContentNote key={note._id} note={note} />
                ))}
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
      </div>
    </div>
  );
};

export default AcordionNotes;
