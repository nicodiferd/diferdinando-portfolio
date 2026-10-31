// A small annotation on each section (and on a card design worth naming), so
// the owner can say which pieces to cherry-pick: "3B" is variant 3, section
// B. It is a lab mark, not design: a fixed neutral look from lab.css, the
// same in every variant, hidden when the lab bar turns tags off. Place it
// at the top of the section it names.
export function LabTag({ id, label }: { id: string; label: string }) {
  return (
    <span className="lab-tag" data-lab-tag aria-hidden="true">
      <b>{id}</b> {label}
    </span>
  );
}
