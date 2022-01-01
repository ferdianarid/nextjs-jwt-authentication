import React from "react";

const SuccessToaster = ( props ) => {
       const { children } = props
       return (
              <div className="py-1 px-2 bg-green-600 rounded-md w-fit text-white font-medium text-sm">
                     { children }
              </div>
       )
}

const LoadingToaster = ( props ) => {
       const { children } = props
       return (
              <div className="py-1 px-2 bg-blue-600 rounded-md w-fit text-white font-medium text-sm">
                     { children }
              </div>
       )
}

export { LoadingToaster, SuccessToaster }