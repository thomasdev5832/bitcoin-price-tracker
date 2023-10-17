type ResultRowProps = {
    loading?: boolean;
};

export default function ResultRow({loading}: ResultRowProps) {
    return (
        <div className=" relative cursor-pointer p-4 m-2 min-h-12 border rounded border-orange-500 bg-neutral-900 hover:bg-orange-500 transition duration-150 ease-out hover:ease-in">
            <div className="flex gap-4">
                <div>Logo</div>
                <div className="grow">Provider</div>
                <div className="flex gap-2">
                    <span className="font-semibold">0.003</span>
                    <span className="text-white/80">BTC</span>
                </div>
            </div>
            {loading && (
                <div className="inset-0 absolute"></div>
            )}
        </div>
    );
}