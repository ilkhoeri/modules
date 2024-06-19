function MyComponent() {
  const [value, setValue] = useState({ x: 0.2, y: 0.6 });
  const { ref, active } = useMove<HTMLButtonElement>(setValue);

    return (
      <>
        <button ref={ref}>x:{value.x} y:{value.y}</button>
        {active && <div shadow="sm"></div>}
      </>
    );

}
