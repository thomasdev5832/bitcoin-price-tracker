import ResultRow from './ResultRow';

export default function loadingSkeleton() {
    return (
        <>
              <ResultRow loading={true} />
              <ResultRow loading={true} />
              <ResultRow loading={true} />
              <ResultRow loading={true} />
        </>
    );
}