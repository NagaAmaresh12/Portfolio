import React from 'react'

const Loader = () => {
    return (
        <div className="fixed inset-0 z-20 flex items-center justify-center text-white text-lg bg-[#75BCC6]">
            <img src="/images/loading.gif" alt="" height={180} width={180} className="bg-transparent" />
        </div>
    )
}

export default Loader