import { FaultGuide } from "@/components/FaultGuide";
import { PageContainer } from "@/components/PageContainer";
import { SectionHeader } from "@/components/SectionHeader";

export default function FaultGuidePage() {
  return (
    <PageContainer className="py-16">
      <SectionHeader
        eyebrow="Felanmälan"
        title="Interaktiv felguide"
        description="Välj vad ärendet gäller så får du en rekommendation om nästa steg, kontaktväg och när jour kan vara motiverad."
      />
      <div className="mt-10">
        <FaultGuide />
      </div>
    </PageContainer>
  );
}
