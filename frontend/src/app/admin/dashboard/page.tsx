import Articles from "@/components/UI/DashboadUI/Articles"
import Categories from "@/components/UI/DashboadUI/Category"



const Dashboard = () => {
    return (
        <main>
            <div className="container">
                <Articles />
                <Categories />
            </div>
        </main>
    )
}

export default Dashboard