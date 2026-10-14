import { useCallback, useEffect, useState } from "react";
import { getStudents } from "../services/studentService";

function DiscoverStudents() {
  const [students, setStudents] = useState([]);
  const [search, setSearch] = useState("");
  const [department, setDepartment] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadStudents = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const data = await getStudents();
      setStudents(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(err.message || "Could not load students.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadStudents();
  }, [loadStudents]);

  const departments = [
    "All",
    ...new Set(
      students.map((student) => student.department).filter(Boolean)
    ),
  ];

  const filteredStudents = students.filter((student) => {
    const searchText = search.toLowerCase();

    const matchesSearch = [
      student.fullName,
      student.department,
      student.skills,
      student.achievements,
    ].some((value) =>
      String(value || "").toLowerCase().includes(searchText)
    );

    const matchesDepartment =
      department === "All" || student.department === department;

    return matchesSearch && matchesDepartment;
  });

  return (
    <main className="discover-container">
      <h1>Discover Students</h1>
      <p>Find talented students across your campus.</p>

      <div className="discover-filters">
        <input
          type="search"
          placeholder="Search by name or skill..."
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />

        <select
          value={department}
          onChange={(event) => setDepartment(event.target.value)}
        >
          {departments.map((item) => (
            <option key={item} value={item}>
              {item === "All" ? "All Departments" : item}
            </option>
          ))}
        </select>

        <button type="button" onClick={loadStudents} disabled={loading}>
          {loading ? "Refreshing..." : "Refresh Students"}
        </button>
      </div>

      {loading && <p>Loading students...</p>}
      {error && <p role="alert">{error}</p>}

      {!loading && !error && filteredStudents.length === 0 && (
        <p>No students found. Try another search.</p>
      )}

      <div className="student-grid">
        {filteredStudents.map((student) => (
          <article className="student-card" key={student.id}>
            <div className="student-avatar">
              {(student.fullName || "S").charAt(0).toUpperCase()}
            </div>

            <h2>{student.fullName || "Student"}</h2>
            <p>
              {student.department || "Department not added"}
              {student.year ? ` • ${student.year}` : ""}
            </p>

            <h3>Skills</h3>
            <p>{student.skills || "No skills added yet."}</p>

            <h3>Achievements</h3>
            <p>{student.achievements || "No achievements added yet."}</p>
          </article>
        ))}
      </div>
    </main>
  );
}

export default DiscoverStudents;
