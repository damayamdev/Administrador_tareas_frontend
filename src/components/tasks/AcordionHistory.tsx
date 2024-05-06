import { statusTranslation } from "@/locales/es";
import { Task } from "@/types/index";
import { Disclosure } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";

type AcordionProps = {
  data: Task;
};

const AcordionHistory = ({ data }: AcordionProps) => {
  return (
    <div className="w-full mt-2">
      <div className=" w-full rounded-2xl">
        <Disclosure>
          {({ open }) => (
            <>
              <Disclosure.Button className="flex focus:outline-none border pl-4 w-full justify-between rounded-lg bg-white py-3 text-left text-sm font-medium text-black">
                <span>Historial de Cambios</span>
                <ChevronDownIcon
                  className={`${open ? "rotate-180 transform" : ""} h-[17px] w-[17px]`}
                />
              </Disclosure.Button>
              <Disclosure.Panel className="px-4 pb-2 pt-2 text-sm text-gray-500">
                {data.completedBy.map((activityLog, i) => (
                  <p key={i} className="text-sm text-slate-400 mb-1">
                    <span className="text-slate-600 font-semibold">
                      Estado actualizado por:
                    </span>{" "}
                    <span className="text-slate-800">
                    {activityLog.user.name} al estado {statusTranslation[activityLog.status]} 
                    </span>
                  </p>
                ))}
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
      </div>
    </div>
  );
};

export default AcordionHistory;
