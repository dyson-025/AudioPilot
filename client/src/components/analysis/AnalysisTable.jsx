import AnalysisRow from "./AnalysisRow";

const AnalysisTable = ({ analyses, handleDelete }) => {
  return (
    <>
      
      <div
        className="
        hidden
        md:grid
        md:grid-cols-6
        gap-4
        px-6
        py-4
        border-b
        border-white/10
        text-gray-500
        text-sm
        "
      >
        <p className="col-span-2">File</p>

        <p>Date</p>

        <p>Clarity</p>

        <p>Status</p>

        <p>Actions</p>
      </div>

      {analyses.map((item) => (
        <AnalysisRow key={item.id} item={item} handleDelete={handleDelete} />
      ))}
    </>
  );
};

export default AnalysisTable;
