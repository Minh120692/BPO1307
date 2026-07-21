import SectionHeader from "../ui/SectionHeader";
import ComparisonTable from "./ComparisonTable";

export default function ComparisonSection() {
  return (
    <section className="section-comparison" id="choose-us">
      <div className="container-xl">
        <SectionHeader
          bgText="WHY CHOOSE US"
          className="mb-5"
          label="WA+CRAFT BPO"
          title="選ばれる理由"
          descClassName="mt-3"
          desc="自社で探す方法や一括見積サイトと比べて、WA+CRAFTのマッチングサービスが選ばれる理由を比較でご確認ください。"
        />
        <div className="row">
          <div className="col-sm-10 offset-sm-1">
            <ComparisonTable />
          </div>
        </div>
      </div>
    </section>
  );
}
