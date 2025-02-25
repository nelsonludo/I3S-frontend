import { useState } from "react";
import { ActorsType } from "../../types/enums/actors-types";
import { EnseignantsType } from "../../types/entities/enseignants";
import BasicModal from "../simpleModal";

type ActorsListPropsType = {
  type: ActorsType;
  actor: EnseignantsType[];
};
const ActorsList: React.FC<ActorsListPropsType> = ({ type, actor }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedEnseignant, setSelectedEnseignant] = useState<any>(null);

  // Filtrer les actors selon la recherche
  const filteredEnseignants = actor.filter((enseignant) => {
    const query = searchQuery.toLowerCase();
    if (type === ActorsType.ENSEIGNANT)
      return enseignant.nom.toLowerCase().includes(query);

    if (type === ActorsType.ETUDIANT) {
      return (
        enseignant.nom.toLowerCase().includes(query) ||
        enseignant.email?.toLowerCase().includes(query)
      );
    }
  });

  return (
    <div className="container mx-auto p-4">
      {/* Barre de recherche */}
      <div className="mb-4">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder={`Rechercher un ${type === ActorsType.ETUDIANT? "etudiant" : type === ActorsType.ENSEIGNANT ? "enseignant" : "laureat"}`}
          className="w-full bg-white rounded-2xl px-4 py-2 shadow-sm focus:outline-none focus:ring-0 "
        />
      </div>

      {/* Liste des enseignants */}
      <div className="bg-white shadow-md rounded-2xl">
        {filteredEnseignants.length > 0 ? (
          <ul>
            {filteredEnseignants.map((enseignant: EnseignantsType) => (
              <li
                key={enseignant.id}
                className="flex items-center justify-between p-4 border-b border-gray-200 last:border-none hover:bg-gray-50"
              >
                <div className="grid grid-cols-[0.5fr_3fr_2fr_2fr]  w-full justify-items-start">
                  {/* Photo de l'enseignant */}
                  <img
                    src={enseignant.photo || "/images/user.png"}
                    alt={enseignant.nom}
                    className="h-12 w-12 rounded-full object-cover"
                  />
                  <div className="m-4">
                    {/* Informations de l'enseignant */}
                    <div className="text-sm font-semibold text-gray-600">
                      {enseignant.nom}
                    </div>
                  </div>
                  <div className="m-4 text-sm text-gray-500 font-medium">
                    {enseignant.grade || enseignant.email}
                  </div>
                  {enseignant.grade ? (
                    <div className=" m-4 text-sm text-gray-400 justify-self-end">
                      <button onClick={() => setSelectedEnseignant(enseignant)}>
                        <BasicModal info={selectedEnseignant} />
                      </button>
                    </div>
                  ) : (
                    <div className="m-4 text-sm text-gray-500">
                      {enseignant.numero}
                    </div>
                  )}
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <div className="p-4 text-center text-gray-500">
            Aucun element trouvé !
          </div>
        )}
      </div>
    </div>
  );
};

export default ActorsList;
